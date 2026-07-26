'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Bot, Save, Loader2, Sparkles, CalendarCheck, DollarSign, Check } from 'lucide-react'
import { useLang } from '@/components/dashboard/LangProvider'
import { SCENARIO_CATALOG, type AiTone } from '@/lib/ai/persona'

const T = {
  uk: {
    title: 'AI-персона', sub: 'Тон спілкування та проактивні сценарії агента',
    agents: 'Агенти', noAgents: 'Спочатку створіть агента в Налаштуваннях',
    toneTitle: 'Тон спілкування', toneSub: 'Як агент звертається до пацієнтів',
    toneClinical: 'Формальний і клінічний', toneWarm: 'Теплий і розмовний', toneSales: 'Орієнтований на продаж',
    scenariosTitle: 'Проактивні сценарії', scenariosSub: 'Ситуації, на які агент реагує самостійно',
    saveBtn: 'Зберегти', saved: 'Збережено',
  },
  en: {
    title: 'AI persona', sub: 'The agent’s tone and proactive scenarios',
    agents: 'Agents', noAgents: 'First create an agent in Settings',
    toneTitle: 'Tone of voice', toneSub: 'How the agent addresses patients',
    toneClinical: 'Formal & Clinical', toneWarm: 'Warm & Conversational', toneSales: 'Sales-Driven',
    scenariosTitle: 'Proactive scenarios', scenariosSub: 'Situations the agent reacts to on its own',
    saveBtn: 'Save', saved: 'Saved',
  },
  cz: {
    title: 'AI persona', sub: 'Tón komunikace a proaktivní scénáře agenta',
    agents: 'Agenti', noAgents: 'Nejprve vytvořte agenta v Nastavení',
    toneTitle: 'Tón komunikace', toneSub: 'Jak agent oslovuje pacienty',
    toneClinical: 'Formální a klinický', toneWarm: 'Vřelý a konverzační', toneSales: 'Zaměřený na prodej',
    scenariosTitle: 'Proaktivní scénáře', scenariosSub: 'Situace, na které agent reaguje sám',
    saveBtn: 'Uložit', saved: 'Uloženo',
  },
}

const TONE_OPTIONS: { value: AiTone; labelKey: 'toneClinical' | 'toneWarm' | 'toneSales' }[] = [
  { value: 'clinical', labelKey: 'toneClinical' },
  { value: 'warm', labelKey: 'toneWarm' },
  { value: 'sales', labelKey: 'toneSales' },
]

const SCENARIO_ICONS: Record<string, typeof Sparkles> = {
  invisalign_promo: Sparkles,
  hygiene_reminder: CalendarCheck,
  too_expensive: DollarSign,
}

interface Agent {
  id: string
  name: string
  widget_color: string
  ai_tone: AiTone | null
  ai_scenarios: { id: string; enabled: boolean }[] | null
}

export default function AiPersonaSettings() {
  const { lang } = useLang()
  const t = T[lang]
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [tone, setTone] = useState<AiTone>('warm')
  const [scenarios, setScenarios] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  const selectAgent = useCallback((agent: Agent) => {
    setSelectedId(agent.id)
    setTone(agent.ai_tone || 'warm')
    const map: Record<string, boolean> = {}
    for (const s of agent.ai_scenarios || []) map[s.id] = s.enabled
    setScenarios(map)
    setJustSaved(false)
  }, [])

  const loadAgents = useCallback(async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase
      .from('agents')
      .select('id, name, widget_color, ai_tone, ai_scenarios')
      .eq('user_id', user!.id)
    const list = (data || []) as Agent[]
    setAgents(list)
    if (list[0]) selectAgent(list[0])
  }, [selectAgent])

  // Data fetch on mount — the setState calls happen inside the async load, not
  // synchronously in the effect body.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadAgents() }, [loadAgents])

  async function save() {
    if (!selectedId) return
    setSaving(true)
    const supabase = createClient()
    const ai_scenarios = Object.keys(SCENARIO_CATALOG).map(id => ({ id, enabled: !!scenarios[id] }))
    await supabase.from('agents').update({ ai_tone: tone, ai_scenarios }).eq('id', selectedId)
    setAgents(prev => prev.map(a => a.id === selectedId ? { ...a, ai_tone: tone, ai_scenarios } : a))
    setSaving(false)
    setJustSaved(true)
  }

  const selected = agents.find(a => a.id === selectedId) || null

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{t.title}</h1>
        <p className="text-slate-500 text-sm">{t.sub}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <span className="font-semibold text-slate-900 text-sm">{t.agents}</span>
            </div>
            {!agents.length && (
              <div className="p-6 text-center"><p className="text-slate-400 text-sm">{t.noAgents}</p></div>
            )}
            <div className="divide-y divide-slate-100">
              {agents.map(agent => (
                <div
                  key={agent.id}
                  onClick={() => selectAgent(agent)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${selectedId === agent.id ? 'bg-indigo-50' : ''}`}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: agent.widget_color + '25' }}>
                    <Bot className="w-4 h-4" style={{ color: agent.widget_color }} />
                  </div>
                  <p className="font-medium text-slate-800 text-sm truncate">{agent.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selected && (
          <div className="lg:col-span-2 space-y-6">
            {/* Tone */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900">{t.toneTitle}</h2>
              <p className="text-slate-400 text-xs mb-4">{t.toneSub}</p>
              <div className="inline-flex items-center border border-slate-200 rounded-xl overflow-hidden">
                {TONE_OPTIONS.map(({ value, labelKey }, i) => (
                  <button
                    key={value}
                    onClick={() => setTone(value)}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                      tone === value ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                    } ${i > 0 ? 'border-l border-slate-200' : ''}`}
                  >
                    {t[labelKey]}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenarios */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900">{t.scenariosTitle}</h2>
              <p className="text-slate-400 text-xs mb-4">{t.scenariosSub}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(SCENARIO_CATALOG).map(([id, meta]) => {
                  const Icon = SCENARIO_ICONS[id] || Sparkles
                  const enabled = !!scenarios[id]
                  return (
                    <button
                      key={id}
                      onClick={() => setScenarios(prev => ({ ...prev, [id]: !prev[id] }))}
                      className={`text-left rounded-xl border p-4 transition-colors ${
                        enabled ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${enabled ? 'bg-indigo-600' : 'bg-slate-100'}`}>
                          <Icon className={`w-4 h-4 ${enabled ? 'text-white' : 'text-slate-400'}`} />
                        </div>
                        <div className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${enabled ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'}`}>
                          <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-slate-800">{meta.label}</p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{meta.prompt}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {t.saveBtn}
              </button>
              {justSaved && !saving && (
                <span className="flex items-center gap-1 text-sm text-emerald-600">
                  <Check className="w-4 h-4" /> {t.saved}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
