import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { createAdminClient } from '@/lib/supabase-admin'
import { generateSalesResponse } from '@/lib/anthropic'
import { findRelevantChunks } from '@/lib/knowledge'

function webhookSecret(botToken: string): string {
  return createHash('sha256').update(botToken).digest('hex')
}

async function sendMessage(botToken: string, chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  }).catch(() => null)
}

async function sendTyping(botToken: string, chatId: number) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
  }).catch(() => null)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params

  const admin = createAdminClient()

  // Load this agent's channel config (token lives here, owner-only table).
  const { data: channel } = await admin
    .from('agent_channels')
    .select('telegram_bot_token, telegram_enabled')
    .eq('agent_id', agentId)
    .single()

  // Always 200 so Telegram doesn't retry on misconfig — just stop processing.
  if (!channel?.telegram_enabled || !channel.telegram_bot_token) {
    return NextResponse.json({ ok: true })
  }
  const botToken = channel.telegram_bot_token

  // Verify the request really came from Telegram for this bot.
  const secret = req.headers.get('x-telegram-bot-api-secret-token')
  if (secret !== webhookSecret(botToken)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const update = await req.json().catch(() => null)
  const msg = update?.message
  const text: string | undefined = msg?.text
  const chatId: number | undefined = msg?.chat?.id
  if (!text || chatId == null) {
    return NextResponse.json({ ok: true })
  }

  // /start greeting
  if (text.trim() === '/start') {
    const { data: a } = await admin.from('agents').select('name').eq('id', agentId).single()
    await sendMessage(botToken, chatId, `👋 ${a?.name || 'AI-адміністратор'}. Чим можу допомогти?`)
    return NextResponse.json({ ok: true })
  }

  const { data: agent } = await admin
    .from('agents')
    .select('name, system_prompt')
    .eq('id', agentId)
    .single()
  if (!agent) return NextResponse.json({ ok: true })

  await sendTyping(botToken, chatId)

  const { data: allChunks } = await admin
    .from('knowledge_chunks')
    .select('content')
    .eq('agent_id', agentId)

  const relevant = findRelevantChunks(text, (allChunks || []).map(c => c.content))

  let reply: string
  try {
    reply = await generateSalesResponse(text, relevant, agent.name, agent.system_prompt)
  } catch (e) {
    console.error('telegram generateSalesResponse failed:', e)
    reply = 'Вибачте, тимчасова помилка. Спробуйте ще раз за хвилину.'
  }

  await sendMessage(botToken, chatId, reply)

  // Log the exchange (best-effort).
  try {
    const visitorId = `tg:${chatId}`
    let { data: conv } = await admin
      .from('conversations')
      .select('id')
      .eq('agent_id', agentId)
      .eq('visitor_id', visitorId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (!conv) {
      const ins = await admin
        .from('conversations')
        .insert({ agent_id: agentId, visitor_id: visitorId })
        .select('id')
        .single()
      conv = ins.data
    }
    if (conv) {
      await admin.from('messages').insert([
        { conversation_id: conv.id, role: 'user', content: text },
        { conversation_id: conv.id, role: 'assistant', content: reply },
      ])
      await admin.from('conversations').update({ updated_at: new Date().toISOString() }).eq('id', conv.id)
    }
  } catch (e) {
    console.error('telegram logging failed:', e)
  }

  return NextResponse.json({ ok: true })
}
