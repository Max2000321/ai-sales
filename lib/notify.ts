import { createAdminClient } from '@/lib/supabase-admin'

/**
 * Shared Resend sender used by every lead/contact notification path.
 * A failed send is never swallowed: it's logged AND persisted to
 * `notification_failures` so the lead survives even if nobody reads the logs.
 */

const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'DentAI <notifications@dentiapps.com>'

interface SendEmailOpts {
  to: string[]
  subject: string
  html: string
  replyTo?: string
  /** Discriminates the source pipeline in notification_failures.kind. */
  kind: 'chat_lead' | 'lead_form' | 'contact_form'
  /** Owning agent, when known — lets a failure surface in that clinic's dashboard. */
  agentId?: string | null
  /** Original submission, stored so the lead can be recovered/resent manually. */
  payload?: unknown
}

export async function sendTransactionalEmail(opts: SendEmailOpts): Promise<boolean> {
  const { to, subject, html, replyTo, kind, agentId = null, payload } = opts
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn(`[${kind}] RESEND_API_KEY not set — email not sent`, { to, subject })
    await recordFailure({ kind, agentId, recipient: to.join(', '), subject, payload, error: 'RESEND_API_KEY not configured' })
    return false
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: RESEND_FROM, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error(`[${kind}] Resend error:`, err)
      await recordFailure({ kind, agentId, recipient: to.join(', '), subject, payload, error: err })
      return false
    }
    return true
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    console.error(`[${kind}] email send threw:`, e)
    await recordFailure({ kind, agentId, recipient: to.join(', '), subject, payload, error: message })
    return false
  }
}

async function recordFailure(row: {
  kind: string
  agentId: string | null
  recipient: string
  subject: string
  payload?: unknown
  error: string
}) {
  try {
    const admin = createAdminClient()
    await admin.from('notification_failures').insert({
      kind: row.kind,
      agent_id: row.agentId,
      recipient: row.recipient,
      subject: row.subject,
      payload: row.payload ?? null,
      error: row.error.slice(0, 2000),
    })
  } catch (e) {
    // The DB write itself failed — this is the last durable channel we have,
    // so make absolutely sure the full payload lands in the process logs.
    console.error('[notify] failed to persist notification_failures row — lead payload follows:', e, JSON.stringify(row))
  }
}
