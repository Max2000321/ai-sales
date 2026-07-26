'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'
import { ArrowRight, TrendingDown, CalendarClock } from 'lucide-react'

// Same booking-conversion assumption as the monthly loss calculator, so the
// two numbers stay internally consistent.
const CONVERSION = 0.3
const WORKING_DAYS = 30
// A retained patient isn't a single visit — average repeat visits/year, plus
// a modest year-over-year referral-growth compounding for lost patients.
const ANNUAL_VISITS = 1.6
const REFERRAL_GROWTH = 0.08

const T = {
  badge: 'Калькулятор LTV',
  title: 'Скільки виручки ви втрачаєте за 3 роки?',
  subtitle: 'Один пропущений пацієнт — це не одна втрачена оплата, а втрачені повторні візити та рекомендації на роки вперед.',
  missedLabel: 'Пропущених звернень на день',
  missedHint: 'Після 19:00 та у вихідні',
  ticketLabel: 'Середній чек пацієнта',
  ticketHint: 'Вартість типового візиту',
  windowLabel: 'Вікно утримання пацієнта',
  windowHint: 'Скільки років клініка зазвичай утримує пацієнта',
  years: (n: number) => `${n} ${n === 1 ? 'рік' : n < 5 ? 'роки' : 'років'}`,
  monthlyLabel: 'Втрата на місяць',
  monthlySuffix: 'недоотриманого доходу щомісяця',
  ltvLabel: (n: number) => `${n}-річна LTV-витік`,
  ltvSuffix: 'з урахуванням повторних візитів і рекомендацій',
  note: 'Оцінка на основі 30% конверсії пропущених звернень, 1.6 повторних візитів на рік і 8% річного приросту за рахунок втрачених рекомендацій.',
  cta: 'Зупинити цю втрату виручки',
}

function formatUAH(value: number): string {
  return `${new Intl.NumberFormat('uk-UA').format(Math.round(value))} грн`
}

/** Smoothly tweens to `value` and renders it live via a MotionValue — no re-render needed per frame. */
function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const spring = useSpring(value, { mass: 0.7, stiffness: 90, damping: 18 })
  const display = useTransform(spring, v => format(v))
  useEffect(() => { spring.set(value) }, [spring, value])
  return <motion.span>{display}</motion.span>
}

function pct(value: number, min: number, max: number): number {
  if (max <= min) return 0
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
}

export default function LtvCalculator() {
  const [missed, setMissed] = useState(5)
  const [ticket, setTicket] = useState(5000)
  const [years, setYears] = useState(3)

  const monthlyLostPatients = missed * WORKING_DAYS * CONVERSION
  const monthlyLoss = monthlyLostPatients * ticket

  // Each year's cohort of lost patients would have kept generating repeat
  // visits (ANNUAL_VISITS) and referrals, which we model as compounding
  // year-over-year at REFERRAL_GROWTH.
  const annualLostPatients = monthlyLostPatients * 12
  let ltvLeakage = 0
  for (let y = 0; y < years; y++) {
    ltvLeakage += annualLostPatients * ticket * ANNUAL_VISITS * Math.pow(1 + REFERRAL_GROWTH, y)
  }

  const missedFill = pct(missed, 1, 20)
  const ticketFill = pct(ticket, 500, 15000)
  const yearsFill = pct(years, 1, 3)

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div className="rounded-3xl border border-indigo-500/20 overflow-hidden shadow-2xl" style={{ background: '#0f1320' }}>
      <div className="px-6 md:px-8 pt-7 pb-5 border-b border-white/5">
        <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
          <TrendingDown className="w-3.5 h-3.5" />
          {T.badge}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">{T.title}</h3>
        <p className="text-white/50 text-sm md:text-base max-w-xl">{T.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ── left: sliders ── */}
        <div className="p-6 md:p-8 space-y-7 border-b md:border-b-0 md:border-r border-white/5">
          <div>
            <div className="flex items-baseline justify-between mb-3 gap-3">
              <label htmlFor="ltv-missed" className="text-sm font-medium text-white/80">{T.missedLabel}</label>
              <span className="text-xl font-bold text-white tabular-nums shrink-0">
                <AnimatedNumber value={missed} format={v => Math.round(v).toString()} />
              </span>
            </div>
            <input
              id="ltv-missed" type="range" className="dentai-range" min={1} max={20} step={1}
              value={missed} onChange={e => setMissed(Number(e.target.value))}
              style={{ backgroundImage: `linear-gradient(to right, #6366f1 ${missedFill}%, #1e2540 ${missedFill}%)`, backgroundSize: '100% 8px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
            />
            <p className="text-white/30 text-xs mt-2">{T.missedHint}</p>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-3 gap-3">
              <label htmlFor="ltv-ticket" className="text-sm font-medium text-white/80">{T.ticketLabel}</label>
              <span className="text-xl font-bold text-white tabular-nums shrink-0">
                <AnimatedNumber value={ticket} format={formatUAH} />
              </span>
            </div>
            <input
              id="ltv-ticket" type="range" className="dentai-range" min={500} max={15000} step={250}
              value={ticket} onChange={e => setTicket(Number(e.target.value))}
              style={{ backgroundImage: `linear-gradient(to right, #6366f1 ${ticketFill}%, #1e2540 ${ticketFill}%)`, backgroundSize: '100% 8px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
            />
            <p className="text-white/30 text-xs mt-2">{T.ticketHint}</p>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-3 gap-3">
              <label htmlFor="ltv-years" className="text-sm font-medium text-white/80 flex items-center gap-1.5">
                <CalendarClock className="w-3.5 h-3.5" /> {T.windowLabel}
              </label>
              <span className="text-xl font-bold text-white tabular-nums shrink-0">{T.years(years)}</span>
            </div>
            <input
              id="ltv-years" type="range" className="dentai-range" min={1} max={3} step={1}
              value={years} onChange={e => setYears(Number(e.target.value))}
              style={{ backgroundImage: `linear-gradient(to right, #6366f1 ${yearsFill}%, #1e2540 ${yearsFill}%)`, backgroundSize: '100% 8px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
            />
            <p className="text-white/30 text-xs mt-2">{T.windowHint}</p>
          </div>

          <p className="text-white/35 text-xs leading-relaxed border-t border-white/5 pt-4">{T.note}</p>
        </div>

        {/* ── right: results ── */}
        <div ref={ref} className="p-6 md:p-8 flex flex-col justify-center gap-6" style={{ background: 'linear-gradient(160deg, #1a1040 0%, #2a0e1e 100%)' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <p className="text-white/50 text-xs font-medium uppercase tracking-wide mb-2">{T.monthlyLabel}</p>
            <div className="text-2xl md:text-3xl font-black text-white tabular-nums leading-none break-words">
              <AnimatedNumber value={monthlyLoss} format={formatUAH} />
            </div>
            <p className="text-white/30 text-xs mt-1.5">{T.monthlySuffix}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            <p className="text-rose-300/80 text-sm font-medium uppercase tracking-wide mb-2">{T.ltvLabel(years)}</p>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tabular-nums leading-none mb-2 break-words">
              <AnimatedNumber value={ltvLeakage} format={formatUAH} />
            </div>
            <p className="text-white/40 text-sm mb-6">{T.ltvSuffix}</p>

            <Link
              href="/register"
              className="btn-shine inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              {T.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
