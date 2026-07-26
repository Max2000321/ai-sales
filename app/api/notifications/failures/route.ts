import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

/** Unacknowledged email delivery failures for the current user's agents. */
export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agents } = await supabase.from('agents').select('id').eq('user_id', user.id)
  const agentIds = (agents || []).map(a => a.id)
  if (!agentIds.length) return NextResponse.json({ failures: [] })

  const { data: failures } = await supabase
    .from('notification_failures')
    .select('id, kind, recipient, subject, error, created_at')
    .in('agent_id', agentIds)
    .is('acknowledged_at', null)
    .order('created_at', { ascending: false })

  return NextResponse.json({ failures: failures || [] })
}
