import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: failure } = await supabase
    .from('notification_failures')
    .select('id, agent_id')
    .eq('id', id)
    .single()
  if (!failure) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: agent } = await supabase.from('agents').select('id').eq('id', failure.agent_id).eq('user_id', user.id).single()
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const admin = createAdminClient()
  await admin.from('notification_failures').update({ acknowledged_at: new Date().toISOString() }).eq('id', id)

  return NextResponse.json({ ok: true })
}
