import { createServerSupabaseClient } from '@/lib/supabase-server'
import { MessageSquare, Bot, TrendingUp, Users } from 'lucide-react'

export default async function AnalyticsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: agents } = await supabase
    .from('agents')
    .select('id, name, widget_color')
    .eq('user_id', user!.id)

  const agentIds = (agents || []).map(a => a.id)

  const { count: totalConversations } = agentIds.length
    ? await supabase
        .from('conversations')
        .select('id', { count: 'exact', head: true })
        .in('agent_id', agentIds)
    : { count: 0 }

  const { count: totalMessages } = agentIds.length
    ? await supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .in('conversation_id',
          (await supabase.from('conversations').select('id').in('agent_id', agentIds)).data?.map(c => c.id) || []
        )
    : { count: 0 }

  const { data: recentConvs } = agentIds.length
    ? await supabase
        .from('conversations')
        .select('created_at, agent_id')
        .in('agent_id', agentIds)
        .order('created_at', { ascending: false })
        .limit(100)
    : { data: [] }

  // Conversations per day (last 7 days)
  const days: { label: string; count: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    const label = d.toLocaleDateString('en', { weekday: 'short' })
    const count = (recentConvs || []).filter(c => c.created_at.slice(0, 10) === dateStr).length
    days.push({ label, count })
  }

  const maxDay = Math.max(...days.map(d => d.count), 1)

  // Per-agent stats
  const agentStats = (agents || []).map(agent => ({
    ...agent,
    conversations: (recentConvs || []).filter(c => c.agent_id === agent.id).length,
  })).sort((a, b) => b.conversations - a.conversations)

  const avgPerConv = totalConversations ? Math.round((totalMessages || 0) / totalConversations) : 0

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Analytics</h1>
        <p className="text-slate-500 text-sm">Overview of your agents' performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total conversations', value: totalConversations ?? 0, icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Total messages', value: totalMessages ?? 0, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Active agents', value: agents?.length ?? 0, icon: Bot, color: 'text-sky-500', bg: 'bg-sky-50' },
          { label: 'Avg messages / conv', value: avgPerConv, icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-500">{label}</span>
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart — conversations last 7 days */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-6">Conversations — last 7 days</h2>
          {(totalConversations ?? 0) === 0 ? (
            <div className="flex items-end justify-center h-32 text-slate-400 text-sm">
              No conversations yet
            </div>
          ) : (
            <div className="flex items-end justify-between gap-2 h-40">
              {days.map(({ label, count }) => (
                <div key={label} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs text-slate-500 font-medium">{count || ''}</span>
                  <div
                    className="w-full rounded-t-lg bg-indigo-500 transition-all"
                    style={{ height: `${Math.max((count / maxDay) * 100, count > 0 ? 8 : 2)}%`, minHeight: 3 }}
                  />
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Per-agent stats */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Conversations by agent</h2>
          {agentStats.length === 0 ? (
            <p className="text-slate-400 text-sm">No agents yet</p>
          ) : (
            <div className="space-y-3">
              {agentStats.map(agent => (
                <div key={agent.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: agent.widget_color + '22' }}
                      >
                        <Bot className="w-3.5 h-3.5" style={{ color: agent.widget_color }} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{agent.name}</span>
                    </div>
                    <span className="text-sm text-slate-500">{agent.conversations}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${agentStats[0].conversations ? (agent.conversations / agentStats[0].conversations) * 100 : 0}%`,
                        backgroundColor: agent.widget_color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
