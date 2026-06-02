import { createServerSupabaseClient } from '@/lib/supabase-server'
import AnalyticsContent from '@/components/dashboard/AnalyticsContent'

export default async function AnalyticsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: agents } = await supabase
    .from('agents')
    .select('id, name, widget_color')
    .eq('user_id', user!.id)

  const agentIds = (agents || []).map(a => a.id)

  const { count: totalConversations } = agentIds.length
    ? await supabase.from('conversations').select('id', { count: 'exact', head: true }).in('agent_id', agentIds)
    : { count: 0 }

  const { count: totalMessages } = agentIds.length
    ? await supabase.from('messages').select('id', { count: 'exact', head: true }).in('conversation_id',
        (await supabase.from('conversations').select('id').in('agent_id', agentIds)).data?.map(c => c.id) || []
      )
    : { count: 0 }

  const { data: recentConvs } = agentIds.length
    ? await supabase.from('conversations').select('created_at, agent_id').in('agent_id', agentIds).order('created_at', { ascending: false }).limit(100)
    : { data: [] }

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().slice(0, 10)
    const count = (recentConvs || []).filter(c => c.created_at.slice(0, 10) === dateStr).length
    return { label: dateStr, count }
  })

  const agentStats = (agents || []).map(agent => ({
    ...agent,
    conversations: (recentConvs || []).filter(c => c.agent_id === agent.id).length,
  })).sort((a, b) => b.conversations - a.conversations)

  const tc = totalConversations ?? 0
  const avgPerConv = tc ? Math.round((totalMessages || 0) / tc) : 0

  return (
    <AnalyticsContent
      totalConversations={tc}
      totalMessages={totalMessages ?? 0}
      agentCount={agents?.length ?? 0}
      avgPerConv={avgPerConv}
      days={days}
      agentStats={agentStats}
    />
  )
}
