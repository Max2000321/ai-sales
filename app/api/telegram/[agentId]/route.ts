import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { createAdminClient } from '@/lib/supabase-admin'
import { generateSalesResponse } from '@/lib/anthropic'
import { findRelevantChunks } from '@/lib/knowledge'

function webhookSecret(botToken: string): string {
  return createHash('sha256').update(botToken).digest('hex')
}

/** businessConnectionId, when set, sends the reply from the manager's personal
 *  account (Telegram Business) instead of the standalone bot. */
async function sendMessage(botToken: string, chatId: number, text: string, businessConnectionId?: string) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...(businessConnectionId ? { business_connection_id: businessConnectionId } : {}),
    }),
  }).catch(() => null)
}

async function sendTyping(botToken: string, chatId: number, businessConnectionId?: string) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      action: 'typing',
      ...(businessConnectionId ? { business_connection_id: businessConnectionId } : {}),
    }),
  }).catch(() => null)
}

interface AdminClient { from: (t: string) => any }

/** Generate the agent reply from its knowledge base and send it back. */
async function answer(
  admin: AdminClient,
  agentId: string,
  botToken: string,
  chatId: number,
  text: string,
  businessConnectionId?: string,
) {
  const { data: agent } = await admin
    .from('agents')
    .select('name, system_prompt')
    .eq('id', agentId)
    .single()
  if (!agent) return

  await sendTyping(botToken, chatId, businessConnectionId)

  const { data: allChunks } = await admin
    .from('knowledge_chunks')
    .select('content')
    .eq('agent_id', agentId)

  const relevant = findRelevantChunks(text, (allChunks || []).map((c: { content: string }) => c.content))

  let reply: string
  try {
    reply = await generateSalesResponse(text, relevant, agent.name, agent.system_prompt)
  } catch (e) {
    console.error('telegram generateSalesResponse failed:', e)
    reply = 'Вибачте, тимчасова помилка. Спробуйте ще раз за хвилину.'
  }

  await sendMessage(botToken, chatId, reply, businessConnectionId)

  // Log the exchange (best-effort). Prefix distinguishes channel.
  try {
    const visitorId = businessConnectionId ? `tgb:${chatId}` : `tg:${chatId}`
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
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params

  const admin = createAdminClient()

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
  if (!update) return NextResponse.json({ ok: true })

  // The bot was (dis)connected to a personal account via Telegram Business.
  if (update.business_connection) {
    return NextResponse.json({ ok: true })
  }

  // ── Business message: AI answers inside the manager's personal chat ──
  if (update.business_message) {
    const msg = update.business_message
    const text: string | undefined = msg?.text
    const chatId: number | undefined = msg?.chat?.id
    const fromId: number | undefined = msg?.from?.id
    const businessConnectionId: string | undefined = msg?.business_connection_id
    // In a private chat, chat.id == the customer's id. A message whose sender
    // is NOT the chat partner is the manager typing — never reply to that.
    if (!text || chatId == null || !businessConnectionId || fromId !== chatId) {
      return NextResponse.json({ ok: true })
    }
    await answer(admin, agentId, botToken, chatId, text, businessConnectionId)
    return NextResponse.json({ ok: true })
  }

  // ── Standalone bot DM ──
  const msg = update.message
  const text: string | undefined = msg?.text
  const chatId: number | undefined = msg?.chat?.id
  if (!text || chatId == null) {
    return NextResponse.json({ ok: true })
  }

  if (text.trim() === '/start') {
    const { data: a } = await admin.from('agents').select('name').eq('id', agentId).single()
    await sendMessage(botToken, chatId, `👋 ${a?.name || 'AI-адміністратор'}. Чим можу допомогти?`)
    return NextResponse.json({ ok: true })
  }

  await answer(admin, agentId, botToken, chatId, text)
  return NextResponse.json({ ok: true })
}
