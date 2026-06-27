import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { generateSalesResponse } from '@/lib/anthropic'
import { findRelevantChunks } from '@/lib/knowledge'
import { GRAPH, verifyMetaSignature } from '@/lib/meta'

// ── GET: Meta webhook verification handshake ──
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')
  if (mode === 'subscribe' && token && token === process.env.META_VERIFY_TOKEN) {
    return new NextResponse(challenge || '', { status: 200 })
  }
  return new NextResponse('forbidden', { status: 403 })
}

async function sendReply(pageId: string, pageToken: string, recipientId: string, text: string) {
  await fetch(`${GRAPH}/${pageId}/messages?access_token=${encodeURIComponent(pageToken)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
      messaging_type: 'RESPONSE',
    }),
  }).catch(() => null)
}

// ── POST: incoming Instagram messages ──
export async function POST(req: NextRequest) {
  const raw = await req.text()
  if (!verifyMetaSignature(raw, req.headers.get('x-hub-signature-256'))) {
    return new NextResponse('bad signature', { status: 403 })
  }

  const body = JSON.parse(raw) as {
    object?: string
    entry?: { id?: string; messaging?: {
      sender?: { id?: string }
      recipient?: { id?: string }
      message?: { text?: string; is_echo?: boolean }
    }[] }[]
  }

  // Always 200 quickly so Meta doesn't retry; process inline.
  if (body.object !== 'instagram') return NextResponse.json({ ok: true })

  const admin = createAdminClient()

  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      const text = event.message?.text
      const senderId = event.sender?.id
      const igAccountId = event.recipient?.id // our clinic's IG business account
      // Skip echoes (the clinic's own outgoing messages) and non-text events.
      if (!text || !senderId || !igAccountId || event.message?.is_echo) continue

      const { data: channel } = await admin
        .from('agent_channels')
        .select('agent_id, instagram_page_id, instagram_page_token, instagram_enabled')
        .eq('instagram_account_id', igAccountId)
        .maybeSingle()

      if (!channel?.instagram_enabled || !channel.instagram_page_token || !channel.instagram_page_id) continue

      const { data: agent } = await admin
        .from('agents')
        .select('name, system_prompt')
        .eq('id', channel.agent_id)
        .single()
      if (!agent) continue

      const { data: allChunks } = await admin
        .from('knowledge_chunks')
        .select('content')
        .eq('agent_id', channel.agent_id)

      const relevant = findRelevantChunks(text, (allChunks || []).map((c: { content: string }) => c.content))

      let reply: string
      try {
        reply = await generateSalesResponse(text, relevant, agent.name, agent.system_prompt)
      } catch (e) {
        console.error('instagram generateSalesResponse failed:', e)
        continue
      }

      await sendReply(channel.instagram_page_id, channel.instagram_page_token, senderId, reply)

      // Log (best-effort).
      try {
        const visitorId = `ig:${senderId}`
        let { data: conv } = await admin
          .from('conversations')
          .select('id')
          .eq('agent_id', channel.agent_id)
          .eq('visitor_id', visitorId)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle()
        if (!conv) {
          const ins = await admin.from('conversations')
            .insert({ agent_id: channel.agent_id, visitor_id: visitorId }).select('id').single()
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
        console.error('instagram logging failed:', e)
      }
    }
  }

  return NextResponse.json({ ok: true })
}
