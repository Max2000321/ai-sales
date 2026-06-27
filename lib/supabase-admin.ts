import { createClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the service-role key. Bypasses RLS.
 * Use ONLY in trusted server contexts (e.g. the Telegram webhook, which has no
 * user session) — never expose the service-role key to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
