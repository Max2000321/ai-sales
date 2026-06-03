'use client'

import Link from 'next/link'
import { Bot, MessageSquare, BookOpen, Plus, ExternalLink, BarChart2 } from 'lucide-react'
import { useLang } from './LangProvider'

const T = {
  uk: {
    title: 'Дашборд',
    newAgent: '+ Новий агент',
    agents: 'Агенти', active: 'активно',
    conversations: 'Розмови', total: 'всього',
    documents: 'Документи', chunks: 'завантажено',
    viewAnalytics: 'Переглянути аналітику',
    yourAgents: 'Ваші агенти', add: 'Додати',
    noAgents: 'Немає агентів. Створіть першого.',
    createAgent: 'Створити агента',
    noDesc: 'Без опису',
    openChat: 'Відкрити чат',
    recentConvs: 'Останні розмови', viewAll: 'Переглянути всі',
    visitor: 'Відвідувач',
  },
  en: {
    title: 'Dashboard',
    newAgent: '+ New agent',
    agents: 'Agents', active: 'active',
    conversations: 'Conversations', total: 'total',
    documents: 'Documents', chunks: 'chunks uploaded',
    viewAnalytics: 'View analytics',
    yourAgents: 'Your agents', add: 'Add',
    noAgents: 'No agents yet. Create your first one.',
    createAgent: 'Create agent',
    noDesc: 'No description',
    openChat: 'Open chat',
    recentConvs: 'Recent conversations', viewAll: 'View all',
    visitor: 'Visitor',
  },
  cz: {
    title: 'Přehled',
    newAgent: '+ Nový agent',
    agents: 'Agenti', active: 'aktivní',
    conversations: 'Konverzace', total: 'celkem',
    documents: 'Dokumenty', chunks: 'nahráno',
    viewAnalytics: 'Zobrazit analytiku',
    yourAgents: 'Vaši agenti', add: 'Přidat',
    noAgents: 'Zatím žádní agenti. Vytvořte prvního.',
    createAgent: 'Vytvořit agenta',
    noDesc: 'Bez popisu',
    openChat: 'Otevřít chat',
    recentConvs: 'Poslední konverzace', viewAll: 'Zobrazit vše',
    visitor: 'Návštěvník',
  },
}

interface Agent {
  id: string
  name: string
  description: string
  widget_color: string
}

interface Conversation {
  id: string
  updated_at: string
  agents: { name: string } | null
}

interface Props {
  email: string
  agents: Agent[]
  totalConversations: number
  totalDocs: number
  recentConversations: Conversation[]
}

export default function DashboardContent({ email, agents, totalConversations, totalDocs, recentConversations }: Props) {
  const { lang } = useLang()
  const t = T[lang]

  const dateLocale = lang === 'uk' ? 'uk' : lang === 'cz' ? 'cs' : 'en'

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.title}</h1>
          <p className="text-slate-500 text-sm mt-1">{email}</p>
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t.newAgent}
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">{t.agents}</span>
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-indigo-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{agents.length}</p>
          <p className="text-xs text-slate-400 mt-1">{t.active}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">{t.conversations}</span>
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalConversations}</p>
          <p className="text-xs text-slate-400 mt-1">{t.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">{t.documents}</span>
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalDocs}</p>
          <p className="text-xs text-slate-400 mt-1">{t.chunks}</p>
        </div>
      </div>

      {/* Analytics link */}
      {totalConversations > 0 && (
        <Link
          href="/analytics"
          className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-3 mb-6 hover:bg-indigo-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">{t.viewAnalytics}</span>
          </div>
          <span className="text-indigo-400 text-sm">→</span>
        </Link>
      )}

      {/* Agents */}
      <div className="bg-white rounded-xl border border-slate-200 mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">{t.yourAgents}</h2>
          <Link href="/settings" className="text-sm text-indigo-600 hover:underline">{t.add}</Link>
        </div>
        {!agents.length ? (
          <div className="p-10 text-center">
            <Bot className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm mb-4">{t.noAgents}</p>
            <Link href="/settings" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
              {t.createAgent}
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: agent.widget_color + '20' }}>
                    <Bot className="w-4 h-4" style={{ color: agent.widget_color }} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{agent.name}</p>
                    <p className="text-slate-400 text-xs">{agent.description || t.noDesc}</p>
                  </div>
                </div>
                <Link
                  href={`/chat/${agent.id}`}
                  target="_blank"
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:border-indigo-300 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t.openChat}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent conversations */}
      {recentConversations.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">{t.recentConvs}</h2>
            <Link href="/conversations" className="text-sm text-indigo-600 hover:underline">{t.viewAll}</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentConversations.map(conv => (
              <div key={conv.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{t.visitor}</p>
                    <p className="text-xs text-slate-400">{conv.agents?.name}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(conv.updated_at).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
