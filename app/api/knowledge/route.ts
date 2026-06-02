import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { chunkText } from '@/lib/knowledge'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { agentId, text, sourceName } = await req.json()
  if (!agentId || !text || !sourceName) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { data: agent } = await supabase
    .from('agents')
    .select('id')
    .eq('id', agentId)
    .eq('user_id', user.id)
    .single()

  if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })

  const chunks = chunkText(text)
  const rows = chunks.map(content => ({ agent_id: agentId, source_name: sourceName, content }))

  const { error } = await supabase.from('knowledge_chunks').insert(rows)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ chunks: rows.length })
}
