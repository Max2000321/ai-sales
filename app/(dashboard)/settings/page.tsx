'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Bot, Save, Loader2, Trash2 } from 'lucide-react'
import { useLang } from '@/components/dashboard/LangProvider'
import TelegramConnect from '@/components/dashboard/TelegramConnect'
import InstagramConnect from '@/components/dashboard/InstagramConnect'

const T = {
  uk: {
    title: 'Налаштування', sub: 'Керуйте вашими агентами',
    agents: 'Агенти', newBtn: '+ Новий', noAgents: 'Агентів ще немає',
    newAgent: 'Новий агент', editAgent: 'Редагувати агента',
    nameLabel: "Назва агента", namePlaceholder: 'напр. Ivory Dental Assistant',
    descLabel: 'Опис', descPlaceholder: 'Короткий опис агента',
    promptLabel: 'Системний промпт',
    colorLabel: 'Колір віджету',
    createBtn: 'Створити', saveBtn: 'Зберегти', deleteBtn: 'Видалити', cancelBtn: 'Скасувати',
  },
  en: {
    title: 'Settings', sub: 'Manage your agents',
    agents: 'Agents', newBtn: '+ New', noAgents: 'No agents yet',
    newAgent: 'New agent', editAgent: 'Edit agent',
    nameLabel: 'Agent name', namePlaceholder: 'e.g. Ivory Dental Assistant',
    descLabel: 'Description', descPlaceholder: 'Brief description of the agent',
    promptLabel: 'System prompt',
    colorLabel: 'Widget color',
    createBtn: 'Create', saveBtn: 'Save', deleteBtn: 'Delete', cancelBtn: 'Cancel',
  },
  cz: {
    title: 'Nastavení', sub: 'Správa vašich agentů',
    agents: 'Agenti', newBtn: '+ Nový', noAgents: 'Zatím žádní agenti',
    newAgent: 'Nový agent', editAgent: 'Upravit agenta',
    nameLabel: 'Název agenta', namePlaceholder: 'např. Ivory Dental asistent',
    descLabel: 'Popis', descPlaceholder: 'Krátký popis agenta',
    promptLabel: 'Systémový prompt',
    colorLabel: 'Barva widgetu',
    createBtn: 'Vytvořit', saveBtn: 'Uložit', deleteBtn: 'Smazat', cancelBtn: 'Zrušit',
  },
}

const DEFAULT_PROMPT = `Ти AI-адміністратор стоматологічної клініки. Відповідай пацієнтам тепло та коротко. Допомагай із записом на прийом (пропонуй слоти: завтра 10:00, 14:30, післязавтра 11:00, 16:00), розповідай про ціни та послуги, перенось і скасовуй записи. Завжди відповідай мовою, якою пише пацієнт.`

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

interface Agent { id: string; name: string; description: string; system_prompt: string; widget_color: string }

export default function SettingsPage() {
  const { lang } = useLang()
  const t = T[lang]
  const [agents, setAgents] = useState<Agent[]>([])
  const [editing, setEditing] = useState<Agent | null>(null)
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({ name: '', description: '', system_prompt: DEFAULT_PROMPT, widget_color: '#6366f1' })

  useEffect(() => { loadAgents() }, [])

  async function loadAgents() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from('agents').select('*').eq('user_id', user!.id)
    setAgents(data || [])
  }

  async function createAgent() {
    if (!newAgent.name?.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('agents').insert({ user_id: user!.id, name: newAgent.name, description: newAgent.description, system_prompt: newAgent.system_prompt, widget_color: newAgent.widget_color })
    await loadAgents()
    setCreating(false)
    setNewAgent({ name: '', description: '', system_prompt: DEFAULT_PROMPT, widget_color: '#6366f1' })
    setSaving(false)
  }

  async function saveAgent() {
    if (!editing) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('agents').update({ name: editing.name, description: editing.description, system_prompt: editing.system_prompt, widget_color: editing.widget_color }).eq('id', editing.id)
    await loadAgents()
    setEditing(null)
    setSaving(false)
  }

  async function deleteAgent(id: string) {
    const supabase = createClient()
    await supabase.from('agents').delete().eq('id', id)
    setAgents(a => a.filter(x => x.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  const form = editing || (creating ? newAgent : null)
  const setForm = editing
    ? (f: Partial<Agent>) => setEditing({ ...editing!, ...f })
    : (f: Partial<Agent>) => setNewAgent({ ...newAgent, ...f })

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{t.title}</h1>
        <p className="text-slate-500 text-sm">{t.sub}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-slate-900 text-sm">{t.agents}</span>
              <button onClick={() => { setCreating(true); setEditing(null) }} className="text-xs text-indigo-600 font-medium hover:underline">{t.newBtn}</button>
            </div>
            {agents.length === 0 && !creating && (
              <div className="p-6 text-center"><p className="text-slate-400 text-sm">{t.noAgents}</p></div>
            )}
            <div className="divide-y divide-slate-100">
              {agents.map(agent => (
                <div key={agent.id} onClick={() => { setEditing(agent); setCreating(false) }}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${editing?.id === agent.id ? 'bg-indigo-50' : ''}`}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: agent.widget_color + '25' }}>
                    <Bot className="w-4 h-4" style={{ color: agent.widget_color }} />
                  </div>
                  <p className="font-medium text-slate-800 text-sm truncate">{agent.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {form && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-5">{creating ? t.newAgent : t.editAgent}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.nameLabel}</label>
                  <input type="text" value={form.name || ''} onChange={e => setForm({ name: e.target.value })} placeholder={t.namePlaceholder} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.descLabel}</label>
                  <input type="text" value={form.description || ''} onChange={e => setForm({ description: e.target.value })} placeholder={t.descPlaceholder} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.promptLabel}</label>
                  <textarea value={form.system_prompt || ''} onChange={e => setForm({ system_prompt: e.target.value })} rows={4} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.colorLabel}</label>
                  <div className="flex gap-2">
                    {COLORS.map(c => (
                      <button key={c} onClick={() => setForm({ widget_color: c })} className={`w-8 h-8 rounded-full border-2 transition-all ${form.widget_color === c ? 'border-slate-900 scale-110' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={creating ? createAgent : saveAgent} disabled={saving} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {creating ? t.createBtn : t.saveBtn}
                  </button>
                  {editing && (
                    <button onClick={() => deleteAgent(editing.id)} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" /> {t.deleteBtn}
                    </button>
                  )}
                  <button onClick={() => { setEditing(null); setCreating(false) }} className="text-slate-500 hover:text-slate-700 text-sm px-3 py-2">
                    {t.cancelBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* Channels — only for an existing (saved) agent */}
            {editing && <TelegramConnect agentId={editing.id} lang={lang} />}
            {editing && <InstagramConnect agentId={editing.id} lang={lang} />}
          </div>
        )}
      </div>
    </div>
  )
}
