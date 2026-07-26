import { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

/** Best-effort client IP from Vercel's forwarded-for header. */
export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() || 'unknown'
}

/**
 * Atomic fixed-window rate limit backed by the `check_rate_limit` Postgres
 * function (see supabase-migrations/004_rate_limits.sql). Fails open — if the
 * check itself errors, we don't block legitimate traffic over an infra hiccup.
 */
export async function checkRateLimit(key: string, windowSeconds: number, maxRequests: number): Promise<boolean> {
  const admin = createAdminClient()
  const { data, error } = await admin.rpc('check_rate_limit', {
    p_key: key,
    p_window_seconds: windowSeconds,
    p_max_requests: maxRequests,
  })
  if (error) {
    console.error('[rate-limit] check failed, failing open:', error)
    return true
  }
  return data as boolean
}
