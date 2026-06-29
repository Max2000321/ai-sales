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
    ctxTitle: 'Контекст клініки',
    ctxHint: 'Ці значення підставляються у промпт замість $\{...\} — заповніть, щоб агент називав їх точно.',
    phoneLabel: 'Номер телефону клініки', phoneHint: 'Для звʼязку з пацієнтом',
    consultLabel: 'Тривалість первинної консультації (хв)', consultHint: 'У хвилинах',
    treatLabel: 'Тривалість лікування карієсу/пломби (хв)', treatHint: 'У хвилинах',
    cancelLabel: 'Скасування / перенос візиту (за скільки годин)', cancelHint: 'За скільки годин до прийому дозволено',
    stopMedsLabel: 'Фраза-відмова щодо ліків', stopMedsHint: 'Порожнє поле = безпечний текст за замовчуванням',
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
    ctxTitle: 'Clinic context',
    ctxHint: 'These values are substituted into the prompt in place of $\{...\} — fill them so the agent states them exactly.',
    phoneLabel: 'Clinic phone number', phoneHint: 'For contacting the patient',
    consultLabel: 'First consultation length (min)', consultHint: 'In minutes',
    treatLabel: 'Cavity / filling treatment length (min)', treatHint: 'In minutes',
    cancelLabel: 'Cancellation / reschedule (hours notice)', cancelHint: 'How many hours before the visit',
    stopMedsLabel: 'Medication refusal phrase', stopMedsHint: 'Leave empty = safe default text is used',
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
    ctxTitle: 'Kontext ordinace',
    ctxHint: 'Tyto hodnoty se dosadí do promptu místo $\{...\} — vyplňte je, aby je agent uváděl přesně.',
    phoneLabel: 'Telefonní číslo ordinace', phoneHint: 'Pro kontakt s pacientem',
    consultLabel: 'Délka první konzultace (min)', consultHint: 'V minutách',
    treatLabel: 'Délka ošetření kazu / plomby (min)', treatHint: 'V minutách',
    cancelLabel: 'Storno / přesun návštěvy (hodin předem)', cancelHint: 'Kolik hodin před návštěvou',
    stopMedsLabel: 'Věta o odmítnutí léků', stopMedsHint: 'Prázdné = použije se bezpečný výchozí text',
    createBtn: 'Vytvořit', saveBtn: 'Uložit', deleteBtn: 'Smazat', cancelBtn: 'Zrušit',
  },
}

const DEFAULT_PROMPT = `Ты — профессиональный, заботливый и квалифицированный AI-администратор стоматологической клиники. Твоя главная цель — помогать пациентам: отвечать на вопросы по прайсу и графику и собирать контактные данные для записи на приём.

КОНТЕКСТ КЛИНИКИ:
- Телефон клиники для связи: \${clinic_phone}
- Длительность первичной консультации: \${consultation_duration} минут.
- Длительность стандартного лечения (кариес/пломба): \${treatment_duration} минут.
- Отмена или перенос визита возможны не позднее чем за \${cancellation_policy} часа(ов) до приёма.

ЯЗЫК: всегда отвечай на том языке, на котором пишет пациент.

1. ОСТРАЯ БОЛЬ (ТРИАЖ): при острой боли, сильном отёке, кровотечении или травме зуба НЕ предлагай обычную запись. Сообщи: «Если это острая боль, мы примем вас без очереди сегодня» и предложи ближайшее свободное время. Как только пациент подтвердит готовность прийти или оставит контакты — немедленно вызови инструмент capture_lead со значением sos: true.

2. МЕДИЦИНСКИЕ ОГРАНИЧЕНИЯ: тебе категорически запрещено ставить диагнозы, назначать лекарства (антибиотики, обезболивающие) и комментировать чужое лечение. На вопросы «что выпить?» или «что это может быть?» отвечай строго: «\${stop_meds_text}» Затем предложи очный осмотр врача и собери контактные данные.

3. ЗАХВАТ ЛИДОВ (инструмент capture_lead): как только пациент назвал своё имя И номер телефона — ты обязан вызвать инструмент capture_lead. Не выводи параметры вызова инструмента текстом в чат. В поле summary передавай краткую суть обращения (например: «Острая боль, нижний левый зуб» или «Запись на консультацию по брекетам»). Никогда не утверждай, что приём окончательно записан — после сбора данных вежливо сообщи, что информация передана администратору и он свяжется для финального подтверждения.

4. ТОН И СТИЛЬ: общайся вежливо, эмпатично, но лаконично. Не используй сложные медицинские термины, если пациент о них не спросил. Пиши короткими абзацами, удобными для чтения в мессенджерах.

Используй информацию о ценах, графике работы и услугах ТОЛЬКО из базы знаний. Если ответа на вопрос в базе нет, отвечай: «Я уточню этот вопрос у администратора, и мы свяжемся с вами в ближайшее время». Не выдумывай цены, имена врачей или услуги.`

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

// Approved safe fallback (mirrors lib/anthropic.ts). Shown as placeholder; if left
// blank the backend substitutes this same text into ${stop_meds_text}.
const DEFAULT_STOP_MEDS = 'Я — виртуальный ассистент и не могу назначать лечение. Чтобы помочь вам безопасно, необходим осмотр врача.'

interface Agent {
  id: string; name: string; description: string; system_prompt: string; widget_color: string
  clinic_phone?: string; consultation_duration?: string; treatment_duration?: string
  cancellation_policy?: string; stop_meds_text?: string
}

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
    await supabase.from('agents').insert({
      user_id: user!.id, name: newAgent.name, description: newAgent.description,
      system_prompt: newAgent.system_prompt, widget_color: newAgent.widget_color,
      clinic_phone: newAgent.clinic_phone, consultation_duration: newAgent.consultation_duration,
      treatment_duration: newAgent.treatment_duration, cancellation_policy: newAgent.cancellation_policy,
      stop_meds_text: newAgent.stop_meds_text,
    })
    await loadAgents()
    setCreating(false)
    setNewAgent({ name: '', description: '', system_prompt: DEFAULT_PROMPT, widget_color: '#6366f1' })
    setSaving(false)
  }

  async function saveAgent() {
    if (!editing) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('agents').update({
      name: editing.name, description: editing.description, system_prompt: editing.system_prompt,
      widget_color: editing.widget_color, clinic_phone: editing.clinic_phone,
      consultation_duration: editing.consultation_duration, treatment_duration: editing.treatment_duration,
      cancellation_policy: editing.cancellation_policy, stop_meds_text: editing.stop_meds_text,
    }).eq('id', editing.id)
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
                <div className="border-t border-slate-100 pt-5">
                  <p className="text-sm font-semibold text-slate-800">{t.ctxTitle}</p>
                  <p className="text-xs text-slate-400 mb-4">{t.ctxHint}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">{t.phoneLabel}</label>
                      <input type="tel" inputMode="tel" value={form.clinic_phone || ''} onChange={e => setForm({ clinic_phone: e.target.value })} placeholder="+380441234567" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      <p className="text-[11px] text-slate-400 mt-1">{t.phoneHint}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">{t.cancelLabel}</label>
                      <input type="number" min="0" inputMode="numeric" value={form.cancellation_policy || ''} onChange={e => setForm({ cancellation_policy: e.target.value })} placeholder="24" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      <p className="text-[11px] text-slate-400 mt-1">{t.cancelHint}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">{t.consultLabel}</label>
                      <input type="number" min="0" inputMode="numeric" value={form.consultation_duration || ''} onChange={e => setForm({ consultation_duration: e.target.value })} placeholder="30" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      <p className="text-[11px] text-slate-400 mt-1">{t.consultHint}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">{t.treatLabel}</label>
                      <input type="number" min="0" inputMode="numeric" value={form.treatment_duration || ''} onChange={e => setForm({ treatment_duration: e.target.value })} placeholder="60" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      <p className="text-[11px] text-slate-400 mt-1">{t.treatHint}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-slate-600 mb-1">{t.stopMedsLabel}</label>
                    <textarea value={form.stop_meds_text || ''} onChange={e => setForm({ stop_meds_text: e.target.value })} rows={3} placeholder={DEFAULT_STOP_MEDS} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                    <p className="text-[11px] text-slate-400 mt-1">{t.stopMedsHint}</p>
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
