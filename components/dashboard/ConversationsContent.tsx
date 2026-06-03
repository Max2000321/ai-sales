'use client'

import { MessageSquare } from 'lucide-react'
import { useLang } from './LangProvider'

const T = {
  uk: {
    title: 'Розмови', sub: 'Повна історія всіх розмов з пацієнтами',
    empty: 'Розмов ще немає', emptySub: "З'являться коли пацієнти почнуть писати",
    more: (n: number) => `+ ще ${n} повідомлень`,
  },
  en: {
    title: 'Conversations', sub: 'Full history of all patient conversations',
    empty: 'No conversations yet', emptySub: 'They will appear when patients start chatting',
    more: (n: number) => `+ ${n} more messages`,
  },
  cz: {
    title: 'Konverzace', sub: 'Celá historie všech konverzací s pacienty',
    empty: 'Zatím žádné konverzace', emptySub: 'Zobrazí se, když pacienti začnou psát',
    more: (n: number) => `+ dalších ${n} zpráv`,
  },
}

interface Message { content: string; role: string; created_at: string }
interface Conversation {
  id: string
  updated_at: string
  agents: { name: string } | null
  messages: Message[]
}

export default function ConversationsContent({ conversations }: { conversations: Conversation[] }) {
  const { lang } = useLang()
  const t = T[lang]
  const dateLocale = lang === 'uk' ? 'uk' : lang === 'cz' ? 'cs' : 'en'

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{t.title}</h1>
        <p className="text-slate-500 text-sm">{t.sub}</p>
      </div>

      {!conversations.length ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">{t.empty}</p>
          <p className="text-slate-400 text-xs mt-1">{t.emptySub}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.map(conv => {
            const msgs = conv.messages || []
            return (
              <div key={conv.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium text-slate-700">
                      {conv.agents?.name || 'Agent'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(conv.updated_at).toLocaleString(dateLocale, {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="px-5 py-3 space-y-2">
                  {msgs.slice(-4).map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${
                        msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {msgs.length > 4 && (
                    <p className="text-xs text-slate-400 text-center">{t.more(msgs.length - 4)}</p>
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
