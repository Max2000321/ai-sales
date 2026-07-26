import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'
import { analyzeConversation } from '@/lib/ai/tagger'
import type { ChatTurn } from '@/lib/anthropic'

/** Runs the auto-tagging pipeline for one conversation and persists the result. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: conversation } = await supabase
    .from('conversations')
    .select('id, agent_id')
    .eq('id', id)
    .single()
  if (!conversation) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: agent } = await supabase
    .from('agents')
    .select('id')
    .eq('id', conversation.agent_id)
    .eq('user_id', user.id)
    .single()
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: messages } = await supabase
    .from('messages')
    .select('role, content')
    .eq('conversation_id', id)
    .order('created_at', { ascending: true })

  const insights = await analyzeConversation((messages || []) as ChatTurn[])

  // Ownership already verified above via the authenticated client — the write
  // itself uses the service-role client since conversations has no owner
  // UPDATE policy (only public INSERT + owner SELECT).
  const admin = createAdminClient()
  await admin
    .from('conversations')
    .update({
      tags: insights.tags,
      lead_score: insights.leadScore,
      ai_summary: { budgetPreference: insights.budgetPreference, nextSteps: insights.nextSteps },
      tagged_at: new Date().toISOString(),
    })
    .eq('id', id)

  return NextResponse.json({ insights })
}
