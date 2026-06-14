'use client'

import { useState } from 'react'
import { X, CheckCircle2, FileText, ArrowRight } from 'lucide-react'
import type { PdfAuditDict } from '@/lib/i18n/types'

interface AuditContext {
  calls: number
  check: number
  monthlyLoss: number
  currency: string
  locale: string
}

interface Props {
  dict: PdfAuditDict
  open: boolean
  onClose: () => void
  context: AuditContext
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function PdfAuditModal({ dict, open, onClose, context }: Props) {
  const [name, setName] = useState('')
  const [practice, setPractice] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canSubmit = name.trim().length > 0 && emailValid && status !== 'sending'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          practice,
          email,
          lead_type: 'pdf_audit_requested',
          calls: context.calls,
          check: context.check,
          monthlyLoss: context.monthlyLoss,
          currency: context.currency,
          locale: context.locale,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  // text-base (16px) keeps iOS Safari from auto-zooming on focus.
  const inputClass =
    'w-full rounded-xl px-4 py-3 text-base text-slate-900 placeholder-slate-400 bg-slate-100 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500'

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.25s ease',
      }}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* card — bottom-sheet on mobile, centered dialog on desktop */}
      <div
        className={`relative w-full md:max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-2xl p-6 sm:p-7 will-change-transform transition-transform duration-300 ease-out ${
          open ? 'translate-y-0 md:scale-100' : 'translate-y-full md:translate-y-4 md:scale-95'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <button onClick={onClose} aria-label={dict.close} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <X size={20} />
        </button>

        {status === 'sent' ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{dict.successTitle}</h3>
            <p className="text-slate-500 text-sm mb-6">{dict.successText}</p>
            <button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              {dict.close}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{dict.modalTitle}</h3>
            </div>
            <p className="text-slate-500 text-sm mb-5">{dict.modalSubtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-slate-600 text-xs font-medium mb-1.5">{dict.nameLabel}</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={dict.namePlaceholder} className={inputClass} required />
              </div>
              <div>
                <label className="block text-slate-600 text-xs font-medium mb-1.5">{dict.practiceLabel}</label>
                <input value={practice} onChange={(e) => setPractice(e.target.value)} placeholder={dict.practicePlaceholder} className={inputClass} />
              </div>
              <div>
                <label className="block text-slate-600 text-xs font-medium mb-1.5">{dict.emailLabel}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={dict.emailPlaceholder} className={inputClass} required />
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="btn-shine w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                {status === 'sending' ? dict.submitting : dict.submit}
                {status !== 'sending' && <ArrowRight className="w-4 h-4" />}
              </button>

              {status === 'error' && (
                <p className="text-sm text-red-500 text-center">{dict.errorText}</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
