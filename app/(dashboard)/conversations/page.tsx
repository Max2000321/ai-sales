import { createServerSupabaseClient } from '@/lib/supabase-server'
import { MessageSquare } from 'lucide-react'

export default async function ConversationsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: agents } = await supabase
    .from('agents')
    .select('id')
    .eq('user_id', user!.id)

  const agentIds = (agents || []).map(a => a.id)

  const { data: conversations } = agentIds.length
    ? await supabase
        .from('conversations')
        .select('*, agents(name), messages(content, role, created_at)')
        .in('agent_id', agentIds)
        .order('updated_at', { ascending: false })
        .limit(50)
    : { data: [] }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Conversations</h1>
        <p className="text-slate-500 text-sm">Full history of all customer conversations</p>
      </div>

      {!conversations?.length ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No conversations yet</p>
          <p className="text-slate-400 text-xs mt-1">They will appear when customers start chatting</p>
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.map(conv => {
            const msgs = (conv.messages as { content: string; role: string; created_at: string }[]) || []
            const lastMsg = msgs[msgs.length - 1]
            return (
              <div key={conv.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium text-slate-700">
                      {(conv.agents as { name: string } | null)?.name || 'Агент'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(conv.updated_at).toLocaleString('ru', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="px-5 py-3 space-y-2">
                  {msgs.slice(-4).map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${
                          msg.role === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {msgs.length > 4 && (
                    <p className="text-xs text-slate-400 text-center">
                      + ещё {msgs.length - 4} сообщений
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
