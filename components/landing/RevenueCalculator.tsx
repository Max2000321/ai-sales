'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, TrendingDown, FileText, CalendarClock } from 'lucide-react'
import PdfAuditModal from './PdfAuditModal'
import type { CalculatorDict, Currency, PdfAuditDict, Locale } from '@/lib/i18n/types'

interface Props {
  dict: CalculatorDict
  currency: Currency
  audit: PdfAuditDict
  locale: Locale
}

const WORKING_DAYS = 30
const CONVERSION = 0.3 // 30% of missed inquiries would have booked if answered instantly
const WINDOW_MIN = 1
const WINDOW_MAX = 3
const WINDOW_DEFAULT = 3
// A retained patient isn't a single visit — average repeat visits/year, plus a
// modest year-over-year referral-growth compounding for the patients lost.
const ANNUAL_VISITS = 1.6
const REFERRAL_GROWTH = 0.08

function formatMoney(value: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat('uk-UA').format(Math.round(value))
  return currency.position === 'before'
    ? `${currency.symbol}${formatted}`
    : `${formatted} ${currency.symbol}`
}

/** Smoothly tweens the displayed number toward `value` on every change via rAF. */
function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    if (from === to) return

    const duration = 500
    const start = performance.now()
    let frame: number

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplay(from + (to - from) * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
      else fromRef.current = to
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return <span>{format(display)}</span>
}

/** Percentage of a range, clamped to [0,100] — used to paint the filled track. */
function pct(value: number, min: number, max: number): number {
  if (max <= min) return 0
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
}

export default function RevenueCalculator({ dict, currency, audit, locale }: Props) {
  const [calls, setCalls] = useState(dict.callsDefault)
  const [check, setCheck] = useState(dict.checkDefault)
  const [years, setYears] = useState(WINDOW_DEFAULT)
  const [auditOpen, setAuditOpen] = useState(false)

  const monthlyLostPatients = calls * WORKING_DAYS * CONVERSION
  const monthlyLoss = monthlyLostPatients * check

  // Each year's cohort of lost patients would have kept generating repeat
  // visits (ANNUAL_VISITS) and referrals, modeled as compounding
  // year-over-year at REFERRAL_GROWTH.
  const annualLostPatients = monthlyLostPatients * 12
  let ltvLeakage = 0
  for (let y = 0; y < years; y++) {
    ltvLeakage += annualLostPatients * check * ANNUAL_VISITS * Math.pow(1 + REFERRAL_GROWTH, y)
  }

  const callsFill = pct(calls, dict.callsMin, dict.callsMax)
  const checkFill = pct(check, dict.checkMin, dict.checkMax)
  const yearsFill = pct(years, WINDOW_MIN, WINDOW_MAX)

  const resultRef = useRef<HTMLDivElement>(null)
  const inView = useInView(resultRef, { once: true, amount: 0.4 })

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
        <div className="p-6 md:p-8 space-y-7 border-b md:border-b-0 md:border-r border-white/5">
          {/* missed inquiries slider */}
          <div>
            <div className="flex items-baseline justify-between mb-3 gap-3">
              <label htmlFor="calc-calls" className="text-sm font-medium text-white/80">{dict.callsLabel}</label>
              <span className="text-xl font-bold text-white tabular-nums shrink-0">
                <AnimatedNumber value={calls} format={v => Math.round(v).toString()} />
              </span>
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
              style={{
                backgroundImage: `linear-gradient(to right, #6366f1 ${callsFill}%, #1e2540 ${callsFill}%)`,
                backgroundSize: '100% 8px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <p className="text-white/30 text-xs mt-2">{dict.callsHint}</p>
          </div>

          {/* average patient value slider */}
          <div>
            <div className="flex items-baseline justify-between mb-3 gap-3">
              <label htmlFor="calc-check" className="text-sm font-medium text-white/80">{dict.checkLabel}</label>
              <span className="text-xl font-bold text-white tabular-nums shrink-0">
                <AnimatedNumber value={check} format={v => formatMoney(v, currency)} />
              </span>
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
              style={{
                backgroundImage: `linear-gradient(to right, #6366f1 ${checkFill}%, #1e2540 ${checkFill}%)`,
                backgroundSize: '100% 8px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <p className="text-white/30 text-xs mt-2">{dict.checkHint}</p>
          </div>

          {/* retention window slider */}
          <div>
            <div className="flex items-baseline justify-between mb-3 gap-3">
              <label htmlFor="calc-window" className="text-sm font-medium text-white/80 flex items-center gap-1.5">
                <CalendarClock className="w-3.5 h-3.5" /> {dict.windowLabel}
              </label>
              <span className="text-xl font-bold text-white tabular-nums shrink-0">{years}</span>
            </div>
            <input
              id="calc-window"
              type="range"
              className="dentai-range"
              min={WINDOW_MIN}
              max={WINDOW_MAX}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              style={{
                backgroundImage: `linear-gradient(to right, #6366f1 ${yearsFill}%, #1e2540 ${yearsFill}%)`,
                backgroundSize: '100% 8px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <p className="text-white/30 text-xs mt-2">{dict.windowHint}</p>
          </div>

          <p className="text-white/35 text-xs leading-relaxed border-t border-white/5 pt-4">{dict.conversionNote}</p>
        </div>

        {/* ── right: combined results ── */}
        <div ref={resultRef} className="p-6 md:p-8 flex flex-col justify-center gap-6" style={{ background: 'linear-gradient(160deg, #1a1040 0%, #2a0e1e 100%)' }}>
          {/* primary metric: monthly loss */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <p className="text-white/50 text-xs font-medium uppercase tracking-wide mb-2">{dict.monthlyLabel}</p>
            <div className="text-2xl md:text-3xl font-black text-white tabular-nums leading-none break-words">
              <AnimatedNumber value={monthlyLoss} format={v => formatMoney(v, currency)} />
            </div>
            <p className="text-white/30 text-xs mt-1.5">{dict.monthlySuffix}</p>
          </motion.div>

          {/* secondary metric: N-year LTV leak */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            <p className="text-rose-300/80 text-sm font-medium uppercase tracking-wide mb-2">{dict.ltvLabelByYears[years - 1]}</p>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tabular-nums leading-none mb-2 break-words">
              <AnimatedNumber value={ltvLeakage} format={v => formatMoney(v, currency)} />
            </div>
            <p className="text-white/40 text-sm mb-7">{dict.ltvSuffix}</p>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/register"
                className="btn-shine inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                {dict.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setAuditOpen(true)}
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white hover:bg-white/10 px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <FileText className="w-4 h-4" />
                {audit.triggerCta}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <PdfAuditModal
        dict={audit}
        open={auditOpen}
        onClose={() => setAuditOpen(false)}
        context={{ calls, check, monthlyLoss, currency: currency.symbol, locale }}
      />
    </div>
  )
}
