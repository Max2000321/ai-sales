'use client'

import { Clock, Smile, Frown, AlertTriangle, Scissors } from 'lucide-react'
import { useLang } from './LangProvider'

const T = {
  uk: { procedure: 'Процедура', pending: 'Заплановано', sent: 'Надіслано, очікуємо відповідь' },
  en: { procedure: 'Procedure', pending: 'Scheduled', sent: 'Sent, awaiting reply' },
  cz: { procedure: 'Zákrok', pending: 'Naplánováno', sent: 'Odesláno, čeká se na odpověď' },
}

export interface RecoveryCheckin {
  id: string
  checkin_stage: '4h' | '24h'
  status: 'pending' | 'sent' | 'feeling_great' | 'mild_pain' | 'request_doctor'
  scheduled_for: string
}

const STATUS_STYLE: Record<RecoveryCheckin['status'], { icon: typeof Scissors; ring: string; bg: string; text: string }> = {
  pending: { icon: Clock, ring: 'ring-slate-200', bg: 'bg-slate-100', text: 'text-slate-400' },
  sent: { icon: Clock, ring: 'ring-sky-200', bg: 'bg-sky-100', text: 'text-sky-500' },
  feeling_great: { icon: Smile, ring: 'ring-emerald-200', bg: 'bg-emerald-100', text: 'text-emerald-600' },
  mild_pain: { icon: Frown, ring: 'ring-amber-200', bg: 'bg-amber-100', text: 'text-amber-600' },
  request_doctor: { icon: AlertTriangle, ring: 'ring-red-200', bg: 'bg-red-100', text: 'text-red-600' },
}

interface TimelineNode {
  key: string
  title: string
  sub: string
  dateLabel: string | null
  icon: typeof Scissors
  ring: string
  bg: string
  text: string
}

export default function PatientTimeline({ procedure, checkins }: { procedure: string; checkins: RecoveryCheckin[] }) {
  const { lang } = useLang()
  const t = T[lang]
  const dateLocale = lang === 'uk' ? 'uk' : lang === 'cz' ? 'cs' : 'en'

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(dateLocale, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

  const byStage = (stage: '4h' | '24h') => checkins.find(c => c.checkin_stage === stage)

  const nodes: TimelineNode[] = [
    { key: 'procedure', title: procedure, sub: t.procedure, dateLabel: null, icon: Scissors, ring: 'ring-indigo-200', bg: 'bg-indigo-100', text: 'text-indigo-600' },
    ...(['4h', '24h'] as const).map(stage => {
      const checkin = byStage(stage)
      const status = checkin?.status || 'pending'
      const style = STATUS_STYLE[status]
      const subLabel = !checkin ? t.pending : status === 'pending' ? t.pending : status === 'sent' ? t.sent : status.replace('_', ' ')
      return {
        key: stage,
        title: `${stage} check-in`,
        sub: subLabel,
        dateLabel: checkin ? formatDate(checkin.scheduled_for) : null,
        icon: style.icon,
        ring: style.ring,
        bg: style.bg,
        text: style.text,
      }
    }),
  ]

  return (
    <div className="flex items-start gap-1">
      {nodes.map((node, i) => {
        const Icon = node.icon
        return (
          <div key={node.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={`w-9 h-9 rounded-full ${node.bg} ring-4 ${node.ring} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${node.text}`} />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-700">{node.title}</p>
                <p className="text-[11px] text-slate-400">{node.sub}</p>
                {node.dateLabel && <p className="text-[10px] text-slate-300">{node.dateLabel}</p>}
              </div>
            </div>
            {i < nodes.length - 1 && <div className="flex-1 h-0.5 bg-slate-200 mx-1 mb-8" />}
          </div>
        )
      })}
    </div>
  )
}
