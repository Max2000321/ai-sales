import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'
import { GRAPH, verifyState } from '@/lib/meta'

function back(origin: string, status: 'ok' | 'error', detail?: string) {
  const u = new URL('/settings', origin)
  u.searchParams.set('ig', status)
  if (detail) u.searchParams.set('ig_detail', detail)
  return NextResponse.redirect(u.toString())
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const origin = url.origin
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  if (url.searchParams.get('error')) return back(origin, 'error', 'declined')
  if (!code || !state) return back(origin, 'error', 'missing_code')

  const agentId = verifyState(state)
  if (!agentId) return back(origin, 'error', 'bad_state')

  // Confirm the signed-in user owns this agent.
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', origin))
  const { data: agent } = await supabase
    .from('agents').select('id').eq('id', agentId).eq('user_id', user.id).single()
  if (!agent) return back(origin, 'error', 'not_owner')

  const redirectUri = `${origin}/api/instagram/callback`

  try {
    // 1. code → short-lived user token
    const tokRes = await fetch(`${GRAPH}/oauth/access_token?` + new URLSearchParams({
      client_id: process.env.META_APP_ID || '',
      client_secret: process.env.META_APP_SECRET || '',
      redirect_uri: redirectUri,
      code,
    })).then(r => r.json())
    if (!tokRes.access_token) return back(origin, 'error', 'token_exchange')

    // 2. short-lived → long-lived user token
    const longRes = await fetch(`${GRAPH}/oauth/access_token?` + new URLSearchParams({
      grant_type: 'fb_exchange_token',
      client_id: process.env.META_APP_ID || '',
      client_secret: process.env.META_APP_SECRET || '',
      fb_exchange_token: tokRes.access_token,
    })).then(r => r.json())
    const userToken = longRes.access_token || tokRes.access_token

    // 3. find a Page with a connected Instagram business account
    const pages = await fetch(`${GRAPH}/me/accounts?` + new URLSearchParams({
      fields: 'id,name,access_token,instagram_business_account{id,username}',
      access_token: userToken,
    })).then(r => r.json())

    const page = (pages.data || []).find((p: { instagram_business_account?: { id?: string } }) => p.instagram_business_account?.id)
    if (!page) return back(origin, 'error', 'no_ig_account')

    const pageId: string = page.id
    const pageToken: string = page.access_token
    const igId: string = page.instagram_business_account.id
    const igUsername: string = page.instagram_business_account.username || ''

    // 4. subscribe the Page to message webhooks
    const sub = await fetch(`${GRAPH}/${pageId}/subscribed_apps?` + new URLSearchParams({
      subscribed_fields: 'messages',
      access_token: pageToken,
    }), { method: 'POST' }).then(r => r.json())
    if (!sub.success) return back(origin, 'error', 'subscribe_failed')

    // 5. persist (service role: agent_channels is owner-only)
    const admin = createAdminClient()
    const { error } = await admin.from('agent_channels').upsert({
      agent_id: agentId,
      instagram_page_id: pageId,
      instagram_account_id: igId,
      instagram_page_token: pageToken,
      instagram_username: igUsername,
      instagram_enabled: true,
      updated_at: new Date().toISOString(),
    })
    if (error) return back(origin, 'error', 'save_failed')

    return back(origin, 'ok', igUsername)
  } catch (e) {
    console.error('instagram callback failed:', e)
    return back(origin, 'error', 'exception')
  }
}
