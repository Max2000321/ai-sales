'use client'

import { useEffect, useRef, useState } from 'react'
import { MailWarning, X } from 'lucide-react'
import { useLang } from './LangProvider'

const T = {
  uk: { title: 'Не вдалося надіслати сповіщення про заявку', ack: 'Опрацьовано' },
  en: { title: 'Failed to send a lead notification', ack: 'Acknowledge' },
  cz: { title: 'Nepodařilo se odeslat oznámení o poptávce', ack: 'Vyřízeno' },
}

interface Failure {
  id: string
  kind: string
  recipient: string | null
  subject: string | null
  error: string
  created_at: string
}

const POLL_MS = 20000

export default function NotificationFailureBanner() {
  const { lang } = useLang()
  const t = T[lang]
  const [failures, setFailures] = useState<Failure[]>([])

  const cancelledRef = useRef(false)

  useEffect(() => {
    cancelledRef.current = false

    async function poll() {
      const res = await fetch('/api/notifications/failures').catch(() => null)
      if (!res?.ok || cancelledRef.current) return
      const { failures: fresh } = await res.json() as { failures: Failure[] }
      setFailures(fresh)
    }

    poll()
    const interval = setInterval(poll, POLL_MS)
    return () => { cancelledRef.current = true; clearInterval(interval) }
  }, [])

  async function acknowledge(id: string) {
    setFailures(prev => prev.filter(f => f.id !== id))
    await fetch(`/api/notifications/${id}/acknowledge`, { method: 'POST' }).catch(() => null)
  }

  if (!failures.length) return null

  return (
    <div className="sticky top-0 z-40 bg-amber-500 text-white">
      {failures.map(f => (
        <div key={f.id} className="flex items-center gap-3 px-4 md:px-8 py-2.5 border-b border-amber-400/50">
          <MailWarning className="w-4 h-4 shrink-0" />
          <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-semibold text-sm">{t.title}:</span>
            <span className="text-sm truncate">{f.subject || f.recipient}</span>
            <span className="text-amber-100 text-xs">· {new Date(f.created_at).toLocaleString()}</span>
          </div>
          <button
            onClick={() => acknowledge(f.id)}
            className="flex items-center gap-1.5 bg-white text-amber-600 hover:bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" /> {t.ack}
          </button>
        </div>
      ))}
    </div>
  )
}
