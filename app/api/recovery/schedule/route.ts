import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'

const HOUR = 60 * 60 * 1000

/** Schedules the 4h + 24h post-care check-ins for a patient. Called from the patient profile modal. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const agentId: string | undefined = body?.agentId
  const conversationId: string | undefined = body?.conversationId
  const patientName: string | undefined = body?.patientName
  const patientPhone: string | undefined = body?.patientPhone
  const procedure: string | undefined = body?.procedure

  if (!agentId || !patientName || !patientPhone || !procedure) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agent } = await supabase.from('agents').select('id').eq('id', agentId).eq('user_id', user.id).single()
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const now = Date.now()
  const admin = createAdminClient()
  const { error } = await admin.from('recovery_checkins').insert([
    {
      agent_id: agentId, conversation_id: conversationId || null,
      patient_name: patientName, patient_phone: patientPhone, procedure,
      checkin_stage: '4h', scheduled_for: new Date(now + 4 * HOUR).toISOString(),
    },
    {
      agent_id: agentId, conversation_id: conversationId || null,
      patient_name: patientName, patient_phone: patientPhone, procedure,
      checkin_stage: '24h', scheduled_for: new Date(now + 24 * HOUR).toISOString(),
    },
  ])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
