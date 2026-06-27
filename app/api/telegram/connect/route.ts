import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'

/** Telegram secret_token must match [A-Za-z0-9_-]{1,256}; derive a stable one. */
function webhookSecret(botToken: string): string {
  return createHash('sha256').update(botToken).digest('hex')
}

export async function POST(req: NextRequest) {
  const { agentId, token } = await req.json()
  if (!agentId || !token) {
    return NextResponse.json({ error: 'Missing agentId or token' }, { status: 400 })
  }

  // ── verify the caller owns this agent ──
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { data: agent } = await supabase
    .from('agents')
    .select('id')
    .eq('id', agentId)
    .eq('user_id', user.id)
    .single()
  if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })

  const botToken = String(token).trim()

  // ── validate the bot token with Telegram ──
  const me = await fetch(`https://api.telegram.org/bot${botToken}/getMe`).then(r => r.json()).catch(() => null)
  if (!me?.ok) {
    return NextResponse.json({ error: 'Invalid bot token' }, { status: 400 })
  }
  const botUsername: string = me.result?.username || ''

  // ── register the webhook ──
  const origin = new URL(req.url).origin
  const webhookUrl = `${origin}/api/telegram/${agentId}`
  const set = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: webhookUrl,
      secret_token: webhookSecret(botToken),
      allowed_updates: ['message'],
      drop_pending_updates: true,
    }),
  }).then(r => r.json()).catch(() => null)

  if (!set?.ok) {
    return NextResponse.json({ error: 'Failed to register webhook', detail: set?.description }, { status: 502 })
  }

  // ── persist the token (service role: agent_channels is owner-only, no public read) ──
  const admin = createAdminClient()
  const { error } = await admin.from('agent_channels').upsert({
    agent_id: agentId,
    telegram_bot_token: botToken,
    telegram_enabled: true,
    updated_at: new Date().toISOString(),
  })
  if (error) {
    console.error('agent_channels upsert failed:', error.message)
    return NextResponse.json({ error: 'Could not save token' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, botUsername })
}

// Disconnect: remove the webhook and disable the channel.
export async function DELETE(req: NextRequest) {
  const { agentId } = await req.json()
  if (!agentId) return NextResponse.json({ error: 'Missing agentId' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { data: agent } = await supabase
    .from('agents').select('id').eq('id', agentId).eq('user_id', user.id).single()
  if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })

  const admin = createAdminClient()
  const { data: channel } = await admin
    .from('agent_channels').select('telegram_bot_token').eq('agent_id', agentId).single()

  if (channel?.telegram_bot_token) {
    await fetch(`https://api.telegram.org/bot${channel.telegram_bot_token}/deleteWebhook`, { method: 'POST' }).catch(() => null)
  }
  await admin.from('agent_channels')
    .update({ telegram_enabled: false, telegram_bot_token: null, updated_at: new Date().toISOString() })
    .eq('agent_id', agentId)

  return NextResponse.json({ ok: true })
}
