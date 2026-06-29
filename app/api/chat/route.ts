import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { generateAgentReply, promptVarsFromAgent } from '@/lib/anthropic'
import { findRelevantChunks } from '@/lib/knowledge'
import { sendChatLead } from '@/lib/leads'

export async function POST(req: NextRequest) {
  const { agentId, message, conversationId, visitorId } = await req.json()

  if (!agentId || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Service role: the public chat widget has no auth session, and conversations
  // have no public SELECT policy — admin lets us persist + read back history.
  const supabase = createAdminClient()

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

  // Resolve the conversation, then load prior turns as history (before logging
  // the current message) so the agent has memory across the dialog.
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

  let history: { role: 'user' | 'assistant'; content: string }[] = []
  if (convId) {
    const { data: prior } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true })
    history = (prior || []) as { role: 'user' | 'assistant'; content: string }[]
    await supabase.from('messages').insert({ conversation_id: convId, role: 'user', content: message })
  }

  const reply = await generateAgentReply({
    message,
    history,
    knowledgeChunks: relevantChunks,
    agentName: agent.name,
    systemPrompt: agent.system_prompt,
    promptVars: promptVarsFromAgent(agent),
    onLead: lead => sendChatLead({
      name: lead.patient_name,
      phone: lead.patient_phone,
      channel: 'Web',
      summary: lead.summary,
      sos: lead.sos,
      agentName: agent.name,
    }),
  })

  if (convId) {
    await supabase.from('messages').insert({ conversation_id: convId, role: 'assistant', content: reply })
    await supabase.from('conversations').update({ updated_at: new Date().toISOString() }).eq('id', convId)
  }

  return NextResponse.json({ reply, conversationId: convId })
}
