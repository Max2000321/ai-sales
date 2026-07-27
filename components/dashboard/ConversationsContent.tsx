'use client'

import { useEffect, useMemo, useState } from 'react'
import { MessageSquare, Sparkles, Filter, RefreshCw, TrendingUp, Wallet, ListChecks, User } from 'lucide-react'
import { useLang } from './LangProvider'
import { Badge } from '@/components/ui/badge'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { TAG_META, type ConversationTag } from '@/lib/ai/tags'
import PatientProfileModal from './PatientProfileModal'

const T = {
  uk: {
    title: 'Розмови', sub: 'Повна історія всіх розмов з пацієнтами',
    empty: 'Розмов ще немає', emptySub: "З'являться коли пацієнти почнуть писати",
    more: (n: number) => `+ ще ${n} повідомлень`,
    filter: 'Теги', filterAll: 'Усі розмови', clear: 'Скинути фільтр',
    analyzing: 'Аналізуємо…', reanalyze: 'Оновити аналіз',
    drawerTitle: 'AI-аналіз розмови', drawerSub: 'Автоматична оцінка на основі переписки',
    leadScore: 'Оцінка ліда', budget: 'Бюджет пацієнта', nextSteps: 'Рекомендований наступний крок',
    unknown: 'не визначено', noInsights: 'Аналіз ще не проводився для цієї розмови.',
    noMatches: 'Немає розмов із цим тегом', patientProfile: 'Профіль пацієнта / постопераційний супровід',
  },
  en: {
    title: 'Conversations', sub: 'Full history of all patient conversations',
    empty: 'No conversations yet', emptySub: 'They will appear when patients start chatting',
    more: (n: number) => `+ ${n} more messages`,
    filter: 'Tags', filterAll: 'All conversations', clear: 'Clear filter',
    analyzing: 'Analyzing…', reanalyze: 'Refresh analysis',
    drawerTitle: 'AI conversation insights', drawerSub: 'Automatic assessment based on the transcript',
    leadScore: 'Lead score', budget: 'Budget preference', nextSteps: 'Recommended next step',
    unknown: 'unknown', noInsights: 'This conversation hasn’t been analyzed yet.',
    noMatches: 'No conversations with this tag', patientProfile: 'Patient profile / post-care follow-up',
  },
  cz: {
    title: 'Konverzace', sub: 'Celá historie všech konverzací s pacienty',
    empty: 'Zatím žádné konverzace', emptySub: 'Zobrazí se, když pacienti začnou psát',
    more: (n: number) => `+ dalších ${n} zpráv`,
    filter: 'Štítky', filterAll: 'Všechny konverzace', clear: 'Zrušit filtr',
    analyzing: 'Analyzuji…', reanalyze: 'Obnovit analýzu',
    drawerTitle: 'AI analýza konverzace', drawerSub: 'Automatické hodnocení na základě přepisu',
    leadScore: 'Skóre leadu', budget: 'Rozpočet pacienta', nextSteps: 'Doporučený další krok',
    unknown: 'neznámé', noInsights: 'Tato konverzace ještě nebyla analyzována.',
    noMatches: 'Žádné konverzace s tímto štítkem', patientProfile: 'Profil pacienta / pooperační sledování',
  },
}

interface Message { content: string; role: string; created_at: string }
interface AiSummary { budgetPreference?: string; nextSteps?: string }
interface Conversation {
  id: string
  agent_id: string
  updated_at: string
  agents: { name: string } | null
  messages: Message[]
  tags: ConversationTag[] | null
  lead_score: number | null
  ai_summary: AiSummary | null
  tagged_at: string | null
  captured_lead_name: string | null
  captured_lead_phone: string | null
}

const ALL_TAGS = Object.keys(TAG_META) as ConversationTag[]

function scoreColor(score: number): string {
  if (score >= 70) return 'text-emerald-600'
  if (score >= 40) return 'text-amber-600'
  return 'text-slate-400'
}

export default function ConversationsContent({ conversations: initial }: { conversations: Conversation[] }) {
  const { lang } = useLang()
  const t = T[lang]
  const dateLocale = lang === 'uk' ? 'uk' : lang === 'cz' ? 'cs' : 'en'

  const [conversations, setConversations] = useState(initial)
  const [activeTags, setActiveTags] = useState<Set<ConversationTag>>(new Set())
  const [drawerId, setDrawerId] = useState<string | null>(null)
  const [analyzingIds, setAnalyzingIds] = useState<Set<string>>(new Set())
  const [profileConvId, setProfileConvId] = useState<string | null>(null)

  async function runTagger(id: string) {
    setAnalyzingIds(prev => new Set(prev).add(id))
    try {
      const res = await fetch(`/api/conversations/${id}/tag`, { method: 'POST' })
      if (!res.ok) return
      const { insights } = await res.json()
      setConversations(prev => prev.map(c => c.id === id
        ? { ...c, tags: insights.tags, lead_score: insights.leadScore, ai_summary: { budgetPreference: insights.budgetPreference, nextSteps: insights.nextSteps }, tagged_at: new Date().toISOString() }
        : c
      ))
    } finally {
      setAnalyzingIds(prev => { const next = new Set(prev); next.delete(id); return next })
    }
  }

  // Background pipeline: lazily tag any conversation that has never been
  // analyzed, or that has new messages since its last analysis — without
  // blocking the patient-facing chat response path.
  useEffect(() => {
    const stale = initial.filter(c => c.messages.length > 0 && (!c.tagged_at || new Date(c.tagged_at) < new Date(c.updated_at)))
    stale.slice(0, 8).forEach(c => { runTagger(c.id) })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once for the conversations this page loaded with
  }, [])

  const filtered = useMemo(() => {
    if (activeTags.size === 0) return conversations
    return conversations.filter(c => (c.tags || []).some(tag => activeTags.has(tag)))
  }, [conversations, activeTags])

  const drawerConv = conversations.find(c => c.id === drawerId) || null

  function toggleTag(tag: ConversationTag) {
    setActiveTags(prev => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{t.title}</h1>
          <p className="text-slate-500 text-sm">{t.sub}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 transition-colors shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            {t.filter}
            {activeTags.size > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold">
                {activeTags.size}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t.filter}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {ALL_TAGS.map(tag => (
              <DropdownMenuCheckboxItem key={tag} checked={activeTags.has(tag)} onCheckedChange={() => toggleTag(tag)}>
                <span className="flex items-center gap-2">
                  <span>{TAG_META[tag].emoji}</span>
                  {TAG_META[tag].label}
                </span>
              </DropdownMenuCheckboxItem>
            ))}
            {activeTags.size > 0 && (
              <>
                <DropdownMenuSeparator />
                <button
                  onClick={() => setActiveTags(new Set())}
                  className="w-full text-left px-2.5 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {t.clear}
                </button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {!conversations.length ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">{t.empty}</p>
          <p className="text-slate-400 text-xs mt-1">{t.emptySub}</p>
        </div>
      ) : !filtered.length ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">{t.noMatches}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(conv => {
            const msgs = conv.messages || []
            const tags = conv.tags || []
            const analyzing = analyzingIds.has(conv.id)
            return (
              <div key={conv.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setDrawerId(conv.id)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <MessageSquare className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-700 shrink-0">
                      {conv.agents?.name || 'Agent'}
                    </span>
                    {analyzing ? (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <RefreshCw className="w-3 h-3 animate-spin" /> {t.analyzing}
                      </span>
                    ) : (
                      tags.map(tag => (
                        <Badge key={tag} variant={tag}>{TAG_META[tag].emoji} {TAG_META[tag].label}</Badge>
                      ))
                    )}
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">
                    {new Date(conv.updated_at).toLocaleString(dateLocale, {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </button>
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

      <Sheet open={!!drawerId} onOpenChange={open => !open && setDrawerId(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              {t.drawerTitle}
            </SheetTitle>
            <SheetDescription>{t.drawerSub}</SheetDescription>
          </SheetHeader>

          {drawerConv && (
            <div className="px-6 pb-6 flex-1 overflow-y-auto space-y-5">
              <div className="flex flex-wrap gap-1.5">
                {(drawerConv.tags || []).map(tag => (
                  <Badge key={tag} variant={tag}>{TAG_META[tag].emoji} {TAG_META[tag].label}</Badge>
                ))}
                {!(drawerConv.tags || []).length && (
                  <span className="text-sm text-slate-400">{t.noInsights}</span>
                )}
              </div>

              {drawerConv.lead_score != null && (
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    <TrendingUp className="w-3.5 h-3.5" /> {t.leadScore}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-3xl font-black tabular-nums ${scoreColor(drawerConv.lead_score)}`}>
                      {drawerConv.lead_score}
                    </span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${drawerConv.lead_score >= 70 ? 'bg-emerald-500' : drawerConv.lead_score >= 40 ? 'bg-amber-500' : 'bg-slate-400'}`}
                        style={{ width: `${drawerConv.lead_score}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    <Wallet className="w-3.5 h-3.5" /> {t.budget}
                  </div>
                  <p className="text-sm text-slate-700">{drawerConv.ai_summary?.budgetPreference || t.unknown}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    <ListChecks className="w-3.5 h-3.5" /> {t.nextSteps}
                  </div>
                  <p className="text-sm text-slate-700">{drawerConv.ai_summary?.nextSteps || t.unknown}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={() => runTagger(drawerConv.id)}
                  disabled={analyzingIds.has(drawerConv.id)}
                  className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:underline disabled:opacity-50 w-fit"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${analyzingIds.has(drawerConv.id) ? 'animate-spin' : ''}`} />
                  {t.reanalyze}
                </button>
                <button
                  onClick={() => setProfileConvId(drawerConv.id)}
                  className="flex items-center gap-2 text-sm text-slate-600 font-medium hover:text-indigo-600 w-fit"
                >
                  <User className="w-3.5 h-3.5" />
                  {t.patientProfile}
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {profileConvId && (
        <PatientProfileModal
          open={!!profileConvId}
          onClose={() => setProfileConvId(null)}
          agentId={conversations.find(c => c.id === profileConvId)?.agent_id || ''}
          conversationId={profileConvId}
          initialName={conversations.find(c => c.id === profileConvId)?.captured_lead_name || ''}
          initialPhone={conversations.find(c => c.id === profileConvId)?.captured_lead_phone || ''}
        />
      )}
    </div>
  )
}
