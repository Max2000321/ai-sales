import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

/** Unacknowledged "request doctor" recovery check-ins for the current user's agents. */
export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agents } = await supabase.from('agents').select('id').eq('user_id', user.id)
  const agentIds = (agents || []).map(a => a.id)
  if (!agentIds.length) return NextResponse.json({ alerts: [] })

  const { data: alerts } = await supabase
    .from('recovery_checkins')
    .select('id, patient_name, patient_phone, procedure, checkin_stage, responded_at')
    .in('agent_id', agentIds)
    .eq('status', 'request_doctor')
    .is('acknowledged_at', null)
    .order('responded_at', { ascending: false })

  return NextResponse.json({ alerts: alerts || [] })
}
