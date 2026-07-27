import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { generateAgentReply, promptVarsFromAgent } from '@/lib/anthropic'
import { findRelevantChunks } from '@/lib/knowledge'
import { sendChatLead } from '@/lib/leads'
import { checkRateLimit, clientIp } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const { agentId, message, conversationId, visitorId } = await req.json()

  if (!agentId || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Public, unauthenticated endpoint — cap per-IP volume to protect against
  // abuse driving up Anthropic spend.
  const allowed = await checkRateLimit(`chat:${clientIp(req)}`, 60, 20)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
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
    systemPrompt: agent.system_prompt,
    promptVars: promptVarsFromAgent(agent),
    persona: { tone: agent.ai_tone, scenarios: agent.ai_scenarios },
    onLead: async lead => {
      if (convId) {
        await supabase.from('conversations')
          .update({ captured_lead_name: lead.patient_name, captured_lead_phone: lead.patient_phone })
          .eq('id', convId)
      }
      return sendChatLead({
        name: lead.patient_name,
        phone: lead.patient_phone,
        channel: 'Web',
        summary: lead.summary,
        sos: lead.sos,
        agentName: agent.name,
        agentId: agent.id,
      })
    },
  })

  if (convId) {
    await supabase.from('messages').insert({ conversation_id: convId, role: 'assistant', content: reply })
    await supabase.from('conversations').update({ updated_at: new Date().toISOString() }).eq('id', convId)
  }

  return NextResponse.json({ reply, conversationId: convId })
}
