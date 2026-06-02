import { createServerSupabaseClient } from '@/lib/supabase-server'
import DashboardContent from '@/components/dashboard/DashboardContent'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: agents } = await supabase
    .from('agents')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const agentIds = (agents || []).map(a => a.id)

  const { count: totalConversations } = agentIds.length
    ? await supabase
        .from('conversations')
        .select('id', { count: 'exact', head: true })
        .in('agent_id', agentIds)
    : { count: 0 }

  const { count: totalDocs } = agentIds.length
    ? await supabase
        .from('knowledge_chunks')
        .select('id', { count: 'exact', head: true })
        .in('agent_id', agentIds)
    : { count: 0 }

  const { data: recentConversations } = agentIds.length
    ? await supabase
        .from('conversations')
        .select('*, agents(name)')
        .in('agent_id', agentIds)
        .order('updated_at', { ascending: false })
        .limit(5)
    : { data: [] }

  return (
    <DashboardContent
      email={user?.email ?? ''}
      agents={agents ?? []}
      totalConversations={totalConversations ?? 0}
      totalDocs={totalDocs ?? 0}
      recentConversations={(recentConversations ?? []) as any}
    />
  )
}
