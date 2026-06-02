'use client'

import { Bot, MessageSquare, TrendingUp, Users } from 'lucide-react'
import { useLang } from './LangProvider'

const T = {
  uk: {
    title: 'Аналітика', sub: 'Статистика роботи ваших агентів',
    totalConvs: 'Всього розмов', totalMsgs: 'Всього повідомлень',
    activeAgents: 'Активних агентів', avgMsgs: 'Сер. повід. / розмова',
    chart: 'Розмови — останні 7 днів', byAgent: 'Розмови по агентах',
    noConvs: 'Розмов ще немає', noAgents: 'Агентів ще немає',
    days: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  },
  en: {
    title: 'Analytics', sub: 'Overview of your agents\' performance',
    totalConvs: 'Total conversations', totalMsgs: 'Total messages',
    activeAgents: 'Active agents', avgMsgs: 'Avg messages / conv',
    chart: 'Conversations — last 7 days', byAgent: 'Conversations by agent',
    noConvs: 'No conversations yet', noAgents: 'No agents yet',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  cz: {
    title: 'Analytika', sub: 'Přehled výkonu vašich agentů',
    totalConvs: 'Celkem konverzací', totalMsgs: 'Celkem zpráv',
    activeAgents: 'Aktivní agenti', avgMsgs: 'Průměr zpráv / konv.',
    chart: 'Konverzace — posledních 7 dní', byAgent: 'Konverzace podle agenta',
    noConvs: 'Zatím žádné konverzace', noAgents: 'Zatím žádní agenti',
    days: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
  },
}

interface AgentStat { id: string; name: string; widget_color: string; conversations: number }
interface DayData { label: string; count: number }

interface Props {
  totalConversations: number
  totalMessages: number
  agentCount: number
  avgPerConv: number
  days: DayData[]
  agentStats: AgentStat[]
}

export default function AnalyticsContent({ totalConversations, totalMessages, agentCount, avgPerConv, days, agentStats }: Props) {
  const { lang } = useLang()
  const t = T[lang]
  const maxDay = Math.max(...days.map(d => d.count), 1)

  // Re-label days in current language
  const today = new Date().getDay()
  const labeledDays = days.map((d, i) => ({
    ...d,
    label: t.days[(today - (6 - i) + 7) % 7],
  }))

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{t.title}</h1>
        <p className="text-slate-500 text-sm">{t.sub}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: t.totalConvs, value: totalConversations, icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: t.totalMsgs, value: totalMessages, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: t.activeAgents, value: agentCount, icon: Bot, color: 'text-sky-500', bg: 'bg-sky-50' },
          { label: t.avgMsgs, value: avgPerConv, icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
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
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-6">{t.chart}</h2>
          {totalConversations === 0 ? (
            <div className="flex items-end justify-center h-32 text-slate-400 text-sm">{t.noConvs}</div>
          ) : (
            <div className="flex items-end justify-between gap-2 h-40">
              {labeledDays.map(({ label, count }) => (
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

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">{t.byAgent}</h2>
          {agentStats.length === 0 ? (
            <p className="text-slate-400 text-sm">{t.noAgents}</p>
          ) : (
            <div className="space-y-3">
              {agentStats.map(agent => (
                <div key={agent.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: agent.widget_color + '22' }}>
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
