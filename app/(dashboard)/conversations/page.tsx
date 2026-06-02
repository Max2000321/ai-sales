import { createServerSupabaseClient } from '@/lib/supabase-server'
import ConversationsContent from '@/components/dashboard/ConversationsContent'

export default async function ConversationsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: agents } = await supabase.from('agents').select('id').eq('user_id', user!.id)
  const agentIds = (agents || []).map(a => a.id)

  const { data: conversations } = agentIds.length
    ? await supabase
        .from('conversations')
        .select('*, agents(name), messages(content, role, created_at)')
        .in('agent_id', agentIds)
        .order('updated_at', { ascending: false })
        .limit(50)
    : { data: [] }

  return <ConversationsContent conversations={(conversations ?? []) as any} />
}
