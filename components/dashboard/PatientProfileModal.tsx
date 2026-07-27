'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { CalendarPlus, Loader2, User } from 'lucide-react'
import { useLang } from './LangProvider'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import PatientTimeline, { type RecoveryCheckin } from './PatientTimeline'

const T = {
  uk: {
    title: 'Профіль пацієнта', sub: 'Постопераційний супровід через WhatsApp',
    nameLabel: "Ім'я пацієнта", phoneLabel: 'Телефон (WhatsApp)', procedureLabel: 'Процедура',
    namePlaceholder: 'Марина К.', phonePlaceholder: '+380671234567', procedurePlaceholder: 'Видалення зуба мудрості',
    schedule: 'Запланувати контроль 4г / 24г', scheduled: 'Заплановано ✓',
    timelineTitle: 'Хронологія відновлення', noCheckins: 'Контрольні точки ще не заплановані для цієї розмови.',
  },
  en: {
    title: 'Patient profile', sub: 'Post-care follow-up via WhatsApp',
    nameLabel: 'Patient name', phoneLabel: 'Phone (WhatsApp)', procedureLabel: 'Procedure',
    namePlaceholder: 'Marina K.', phonePlaceholder: '+380671234567', procedurePlaceholder: 'Wisdom tooth extraction',
    schedule: 'Schedule 4h / 24h check-in', scheduled: 'Scheduled ✓',
    timelineTitle: 'Recovery timeline', noCheckins: 'No check-ins scheduled yet for this conversation.',
  },
  cz: {
    title: 'Profil pacienta', sub: 'Pooperační sledování přes WhatsApp',
    nameLabel: 'Jméno pacienta', phoneLabel: 'Telefon (WhatsApp)', procedureLabel: 'Zákrok',
    namePlaceholder: 'Marina K.', phonePlaceholder: '+380671234567', procedurePlaceholder: 'Extrakce zubu moudrosti',
    schedule: 'Naplánovat kontrolu 4h / 24h', scheduled: 'Naplánováno ✓',
    timelineTitle: 'Časová osa zotavení', noCheckins: 'Pro tuto konverzaci zatím nejsou naplánované kontroly.',
  },
}

interface Props {
  open: boolean
  onClose: () => void
  agentId: string
  conversationId: string
  /** Pre-fill from the lead already captured by the AI, when available. */
  initialName?: string
  initialPhone?: string
}

export default function PatientProfileModal({ open, onClose, agentId, conversationId, initialName = '', initialPhone = '' }: Props) {
  const { lang } = useLang()
  const t = T[lang]
  const [name, setName] = useState(initialName)
  const [phone, setPhone] = useState(initialPhone)
  const [procedure, setProcedure] = useState('')
  const [saving, setSaving] = useState(false)
  const [justScheduled, setJustScheduled] = useState(false)
  const [checkins, setCheckins] = useState<RecoveryCheckin[]>([])
  const [checkinProcedure, setCheckinProcedure] = useState('')

  const loadCheckins = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('recovery_checkins')
      .select('id, checkin_stage, status, scheduled_for, procedure')
      .eq('conversation_id', conversationId)
      .order('scheduled_for', { ascending: true })
    const rows = (data || []) as (RecoveryCheckin & { procedure: string })[]
    setCheckins(rows)
    if (rows[0]) setCheckinProcedure(rows[0].procedure)
  }, [conversationId])

  // Reset + reload whenever the sheet opens for a (possibly different) conversation.
  useEffect(() => {
    if (!open) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJustScheduled(false)
    loadCheckins()
  }, [open, conversationId, loadCheckins])

  async function schedule(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !procedure.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/recovery/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, conversationId, patientName: name, patientPhone: phone, procedure }),
      })
      if (res.ok) {
        setJustScheduled(true)
        setCheckinProcedure(procedure)
        await loadCheckins()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={o => !o && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            {t.title}
          </SheetTitle>
          <SheetDescription>{t.sub}</SheetDescription>
        </SheetHeader>

        <div className="px-6 pb-6 flex-1 overflow-y-auto space-y-6">
          {checkins.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{t.timelineTitle}</p>
              <PatientTimeline procedure={checkinProcedure} checkins={checkins} />
            </div>
          )}

          <form onSubmit={schedule} className="space-y-3 border-t border-slate-100 pt-5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">{t.nameLabel}</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">{t.phoneLabel}</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phonePlaceholder} type="tel"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">{t.procedureLabel}</label>
              <input value={procedure} onChange={e => setProcedure(e.target.value)} placeholder={t.procedurePlaceholder}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <button
              type="submit"
              disabled={saving || justScheduled}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarPlus className="w-4 h-4" />}
              {justScheduled ? t.scheduled : t.schedule}
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
