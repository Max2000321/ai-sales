import { createHmac, timingSafeEqual } from 'crypto'

export const GRAPH = 'https://graph.facebook.com/v21.0'

/** HMAC-signed state for the OAuth round-trip (carries the agentId). */
export function signState(agentId: string): string {
  const payload = Buffer.from(JSON.stringify({ a: agentId })).toString('base64url')
  const sig = createHmac('sha256', process.env.META_APP_SECRET || '').update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifyState(state: string): string | null {
  const [payload, sig] = (state || '').split('.')
  if (!payload || !sig) return null
  const expected = createHmac('sha256', process.env.META_APP_SECRET || '').update(payload).digest('base64url')
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  } catch {
    return null
  }
  try {
    return (JSON.parse(Buffer.from(payload, 'base64url').toString()) as { a?: string }).a || null
  } catch {
    return null
  }
}

/** Verify Meta webhook payload signature (X-Hub-Signature-256: sha256=...). */
export function verifyMetaSignature(rawBody: string, header: string | null): boolean {
  if (!header?.startsWith('sha256=')) return false
  const expected = createHmac('sha256', process.env.META_APP_SECRET || '').update(rawBody).digest('hex')
  const got = header.slice('sha256='.length)
  try {
    return timingSafeEqual(Buffer.from(got), Buffer.from(expected))
  } catch {
    return false
  }
}
