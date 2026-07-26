'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Phone, X } from 'lucide-react'
import { useLang } from './LangProvider'

const T = {
  uk: {
    title: 'Пацієнт просить лікаря', requestedAt: 'Запит',
    call: 'Зателефонувати', ack: 'Опрацьовано',
  },
  en: {
    title: 'Patient requested a doctor', requestedAt: 'Requested',
    call: 'Call', ack: 'Acknowledge',
  },
  cz: {
    title: 'Pacient žádá lékaře', requestedAt: 'Požadavek',
    call: 'Zavolat', ack: 'Vyřízeno',
  },
}

interface Alert {
  id: string
  patient_name: string
  patient_phone: string
  procedure: string
  checkin_stage: '4h' | '24h'
  responded_at: string | null
}

const POLL_MS = 20000

/** Beeps twice using the Web Audio API — no audio asset to ship or fetch. */
function playAlertSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()
    const beepAt = (start: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 880
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + start)
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + start + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + 0.28)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + start)
      osc.stop(ctx.currentTime + start + 0.3)
    }
    beepAt(0)
    beepAt(0.35)
  } catch {
    // Audio not available (e.g. autoplay policy) — the visual banner still shows.
  }
}

export default function RecoveryAlertBanner() {
  const { lang } = useLang()
  const t = T[lang]
  const dateLocale = lang === 'uk' ? 'uk' : lang === 'cz' ? 'cs' : 'en'
  const [alerts, setAlerts] = useState<Alert[]>([])
  const seenIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    let cancelled = false

    async function poll() {
      const res = await fetch('/api/recovery/alerts').catch(() => null)
      if (!res?.ok || cancelled) return
      const { alerts: fresh } = await res.json() as { alerts: Alert[] }
      const hasNew = fresh.some(a => !seenIds.current.has(a.id))
      if (hasNew && seenIds.current.size > 0) playAlertSound()
      // First load also beeps once if there's already something unacknowledged.
      if (hasNew && seenIds.current.size === 0 && fresh.length > 0) playAlertSound()
      fresh.forEach(a => seenIds.current.add(a.id))
      setAlerts(fresh)
    }

    poll()
    const interval = setInterval(poll, POLL_MS)
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  async function acknowledge(id: string) {
    setAlerts(prev => prev.filter(a => a.id !== id))
    await fetch(`/api/recovery/${id}/acknowledge`, { method: 'POST' }).catch(() => null)
  }

  if (!alerts.length) return null

  return (
    <div className="sticky top-0 z-40 bg-red-600 text-white">
      {alerts.map(alert => (
        <div key={alert.id} className="flex items-center gap-3 px-4 md:px-8 py-2.5 border-b border-red-500/50">
          <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse" />
          <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-semibold text-sm">{t.title}:</span>
            <span className="text-sm">{alert.patient_name}</span>
            <span className="text-red-200 text-xs">· {alert.procedure} · {alert.checkin_stage}</span>
            {alert.responded_at && (
              <span className="text-red-200 text-xs">
                · {t.requestedAt} {new Date(alert.responded_at).toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
          <a
            href={`tel:${alert.patient_phone}`}
            className="hidden sm:flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" /> {t.call}
          </a>
          <button
            onClick={() => acknowledge(alert.id)}
            className="flex items-center gap-1.5 bg-white text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" /> {t.ack}
          </button>
        </div>
      ))}
    </div>
  )
}
