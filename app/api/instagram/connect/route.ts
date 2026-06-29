import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'
import { GRAPH, signState } from '@/lib/meta'

// Must match exactly the permissions added to the Meta app's Instagram
// (Facebook login) use case — pages_manage_metadata is NOT among them and
// makes the OAuth dialog reject the request with "Invalid Scopes".
const SCOPES = [
  'instagram_basic',
  'instagram_manage_messages',
  'pages_show_list',
  'pages_read_engagement',
  'business_management',
].join(',')

// GET ?agentId=... → redirect the owner into the Facebook OAuth dialog.
export async function GET(req: NextRequest) {
  const agentId = new URL(req.url).searchParams.get('agentId')
  if (!agentId) return NextResponse.json({ error: 'Missing agentId' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', req.url))

  const { data: agent } = await supabase
    .from('agents').select('id').eq('id', agentId).eq('user_id', user.id).single()
  if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })

  const origin = new URL(req.url).origin
  const redirectUri = `${origin}/api/instagram/callback`
  const dialog = new URL('https://www.facebook.com/v21.0/dialog/oauth')
  dialog.searchParams.set('client_id', process.env.META_APP_ID || '')
  dialog.searchParams.set('redirect_uri', redirectUri)
  dialog.searchParams.set('state', signState(agentId))
  dialog.searchParams.set('scope', SCOPES)
  dialog.searchParams.set('response_type', 'code')

  return NextResponse.redirect(dialog.toString())
}

// DELETE { agentId } → unsubscribe + clear Instagram channel.
export async function DELETE(req: NextRequest) {
  const { agentId } = await req.json().catch(() => ({}))
  if (!agentId) return NextResponse.json({ error: 'Missing agentId' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { data: agent } = await supabase
    .from('agents').select('id').eq('id', agentId).eq('user_id', user.id).single()
  if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })

  const admin = createAdminClient()
  const { data: ch } = await admin
    .from('agent_channels')
    .select('instagram_page_id, instagram_page_token')
    .eq('agent_id', agentId)
    .maybeSingle()

  if (ch?.instagram_page_id && ch.instagram_page_token) {
    await fetch(`${GRAPH}/${ch.instagram_page_id}/subscribed_apps?access_token=${encodeURIComponent(ch.instagram_page_token)}`, {
      method: 'DELETE',
    }).catch(() => null)
  }

  await admin.from('agent_channels').update({
    instagram_enabled: false,
    instagram_page_id: null,
    instagram_account_id: null,
    instagram_page_token: null,
    instagram_username: null,
    updated_at: new Date().toISOString(),
  }).eq('agent_id', agentId)

  return NextResponse.json({ ok: true })
}
