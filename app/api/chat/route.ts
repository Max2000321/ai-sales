import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { generateSalesResponse } from '@/lib/anthropic'
import { findRelevantChunks } from '@/lib/knowledge'

export async function POST(req: NextRequest) {
  const { agentId, message, conversationId, visitorId } = await req.json()

  if (!agentId || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()

  const { data: agent } = await supabase
    .from('agents')
    .select('*')
    .eq('id', agentId)
    .single()

  if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })

  const { data: allChunks } = await supabase
    .from('knowledge_chunks')
    .select('content')
    .eq('agent_id', agentId)

  const relevantChunks = findRelevantChunks(
    message,
    (allChunks || []).map(c => c.content)
  )

  let convId = conversationId
  if (!convId) {
    const vid = visitorId || crypto.randomUUID()
    const { data: conv } = await supabase
      .from('conversations')
      .insert({ agent_id: agentId, visitor_id: vid })
      .select('id')
      .single()
    convId = conv?.id
  }

  if (convId) {
    await supabase.from('messages').insert({ conversation_id: convId, role: 'user', content: message })
  }

  const reply = await generateSalesResponse(message, relevantChunks, agent.name, agent.system_prompt)

  if (convId) {
    await supabase.from('messages').insert({ conversation_id: convId, role: 'assistant', content: reply })
    await supabase.from('conversations').update({ updated_at: new Date().toISOString() }).eq('id', convId)
  }

  return NextResponse.json({ reply, conversationId: convId })
}
