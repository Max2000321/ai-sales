'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingDown } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'
import type { CalculatorDict, Currency } from '@/lib/i18n/types'

interface Props {
  dict: CalculatorDict
  currency: Currency
}

const WORKING_DAYS = 30
const CONVERSION = 0.3 // 30% of missed inquiries would have booked if answered instantly

function formatMoney(value: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat('uk-UA').format(Math.round(value))
  return currency.position === 'before'
    ? `${currency.symbol}${formatted}`
    : `${formatted} ${currency.symbol}`
}

/** Percentage of a range, clamped to [0,100] — used to paint the filled track. */
function pct(value: number, min: number, max: number): number {
  if (max <= min) return 0
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
}

export default function RevenueCalculator({ dict, currency }: Props) {
  const [calls, setCalls] = useState(dict.callsDefault)
  const [check, setCheck] = useState(dict.checkDefault)

  const target = Math.round(calls * WORKING_DAYS * CONVERSION * check)

  // Kinetic counter: animate 0 → target the first time the result scrolls in,
  // then track slider changes instantly afterwards.
  const resultRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = resultRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const display = useCountUp(target, 1500, visible)

  const callsFill = pct(calls, dict.callsMin, dict.callsMax)
  const checkFill = pct(check, dict.checkMin, dict.checkMax)

  return (
    <div className="rounded-3xl border border-indigo-500/20 overflow-hidden shadow-2xl" style={{ background: '#0f1320' }}>
      {/* header */}
      <div className="px-6 md:px-8 pt-7 pb-5 border-b border-white/5">
        <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
          <TrendingDown className="w-3.5 h-3.5" />
          {dict.badge}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">{dict.title}</h3>
        <p className="text-white/50 text-sm md:text-base max-w-xl">{dict.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ── left: sliders ── */}
        <div className="p-6 md:p-8 space-y-8 border-b md:border-b-0 md:border-r border-white/5">
          {/* calls slider */}
          <div>
            <div className="flex items-baseline justify-between mb-3 gap-3">
              <label htmlFor="calc-calls" className="text-sm font-medium text-white/80">{dict.callsLabel}</label>
              <span className="text-xl font-bold text-white tabular-nums shrink-0">{calls}</span>
            </div>
            <input
              id="calc-calls"
              type="range"
              className="dentai-range"
              min={dict.callsMin}
              max={dict.callsMax}
              step={dict.callsStep}
              value={calls}
              onChange={(e) => setCalls(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, #6366f1 ${callsFill}%, #1e2540 ${callsFill}%)` }}
            />
            <p className="text-white/30 text-xs mt-2">{dict.callsHint}</p>
          </div>

          {/* check slider */}
          <div>
            <div className="flex items-baseline justify-between mb-3 gap-3">
              <label htmlFor="calc-check" className="text-sm font-medium text-white/80">{dict.checkLabel}</label>
              <span className="text-xl font-bold text-white tabular-nums shrink-0">{formatMoney(check, currency)}</span>
            </div>
            <input
              id="calc-check"
              type="range"
              className="dentai-range"
              min={dict.checkMin}
              max={dict.checkMax}
              step={dict.checkStep}
              value={check}
              onChange={(e) => setCheck(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, #6366f1 ${checkFill}%, #1e2540 ${checkFill}%)` }}
            />
            <p className="text-white/30 text-xs mt-2">{dict.checkHint}</p>
          </div>

          <p className="text-white/35 text-xs leading-relaxed border-t border-white/5 pt-4">{dict.conversionNote}</p>
        </div>

        {/* ── right: result ── */}
        <div ref={resultRef} className="p-6 md:p-8 flex flex-col justify-center" style={{ background: 'linear-gradient(160deg, #1a1040 0%, #2a0e1e 100%)' }}>
          <p className="text-rose-300/80 text-sm font-medium uppercase tracking-wide mb-3">{dict.resultLabel}</p>
          <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tabular-nums leading-none mb-2 break-words">
            {formatMoney(display, currency)}
          </div>
          <p className="text-white/40 text-sm mb-7">{dict.resultSuffix}</p>
          <Link
            href="/register"
            className="btn-shine inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors w-full sm:w-auto"
          >
            {dict.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
