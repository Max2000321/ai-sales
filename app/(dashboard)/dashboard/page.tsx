import { createServerSupabaseClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Bot, MessageSquare, BookOpen, Plus, ExternalLink, BarChart2 } from 'lucide-react'

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
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">{user?.email}</p>
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New agent
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Agents</span>
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-indigo-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{agents?.length ?? 0}</p>
          <p className="text-xs text-slate-400 mt-1">active</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Conversations</span>
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalConversations ?? 0}</p>
          <p className="text-xs text-slate-400 mt-1">total</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Documents</span>
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalDocs ?? 0}</p>
          <p className="text-xs text-slate-400 mt-1">chunks uploaded</p>
        </div>
      </div>

      {/* Quick links */}
      {(totalConversations ?? 0) > 0 && (
        <Link
          href="/analytics"
          className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-3 mb-6 hover:bg-indigo-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">View analytics</span>
          </div>
          <span className="text-indigo-400 text-sm">→</span>
        </Link>
      )}

      {/* Agents */}
      <div className="bg-white rounded-xl border border-slate-200 mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Your agents</h2>
          <Link href="/settings" className="text-sm text-indigo-600 hover:underline">Add</Link>
        </div>
        {!agents?.length ? (
          <div className="p-10 text-center">
            <Bot className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm mb-4">No agents yet. Create your first one.</p>
            <Link
              href="/settings"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
              Create agent
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: agent.widget_color + '20' }}
                  >
                    <Bot className="w-4 h-4" style={{ color: agent.widget_color }} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{agent.name}</p>
                    <p className="text-slate-400 text-xs">{agent.description || 'No description'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/chat/${agent.id}`}
                    target="_blank"
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:border-indigo-300 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Open chat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent conversations */}
      {!!recentConversations?.length && (
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Recent conversations</h2>
            <Link href="/conversations" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentConversations.map(conv => (
              <div key={conv.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Visitor</p>
                    <p className="text-xs text-slate-400">{(conv.agents as { name: string } | null)?.name}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(conv.updated_at).toLocaleDateString('en', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
