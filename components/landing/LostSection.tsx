import { MessageCircle, BellOff, Search, UserX, Inbox } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import RevenueCalculator from './RevenueCalculator'
import type { LostTimelineDict, CalculatorDict, Currency, PdfAuditDict, Locale } from '@/lib/i18n/types'

interface Props {
  dict: LostTimelineDict
  calculator: CalculatorDict
  currency: Currency
  audit: PdfAuditDict
  locale: Locale
}

// Visual config zipped by index to dict.steps.
const STEP_VISUALS = [
  { Icon: MessageCircle, iconClass: 'text-indigo-400', status: 'patient' },
  { Icon: BellOff, iconClass: 'text-slate-400', status: 'lost' },
  { Icon: Search, iconClass: 'text-amber-400', status: 'danger' },
  { Icon: UserX, iconClass: 'text-red-400', status: 'lost' },
  { Icon: Inbox, iconClass: 'text-slate-500', status: 'late' },
]

function dotColor(status: string) {
  return status === 'patient' ? 'bg-indigo-400'
    : status === 'lost' ? 'bg-red-400'
    : status === 'danger' ? 'bg-amber-400'
    : 'bg-slate-600'
}

function cardBorder(status: string) {
  return status === 'lost' ? 'border-red-500/20 bg-red-500/5'
    : status === 'danger' ? 'border-amber-500/20 bg-amber-500/5'
    : status === 'patient' ? 'border-indigo-500/20 bg-indigo-500/5'
    : 'border-white/5 bg-white/3'
}

export default function LostSection({ dict, calculator, currency, audit, locale }: Props) {
  return (
    <section className="py-12 md:py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{dict.title}</h2>
            <p className="text-white/50 text-lg">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />
          <div className="space-y-0">
            {dict.steps.map((item, i) => {
              const v = STEP_VISUALS[i] ?? STEP_VISUALS[0]
              return (
                <AnimateOnScroll key={i} delay={i * 100} className="flex gap-6 pb-0">
                    <div className="hidden sm:flex flex-col items-center gap-1 w-24 shrink-0 pt-5">
                      <span className="text-white/30 text-xs font-mono">{item.time}</span>
                      <span className="text-white/20 text-xs">{item.day}</span>
                    </div>
                    <div className="hidden sm:flex flex-col items-center shrink-0">
                      <div className={`w-3 h-3 rounded-full mt-6 z-10 shrink-0 ${dotColor(v.status)}`} />
                    </div>
                    <div className={`flex-1 rounded-2xl p-5 mb-3 border ${cardBorder(v.status)}`}>
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mt-0.5">
                          <v.Icon className={`w-4 h-4 ${v.iconClass}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <p className="font-semibold text-white text-sm">{item.title}</p>
                            <span className="sm:hidden text-white/30 text-xs font-mono">{item.time} · {item.day}</span>
                          </div>
                          <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                )
              })}
            </div>
          </div>
        <AnimateOnScroll delay={200}>
          <div className="mt-10 border border-indigo-500/20 bg-indigo-500/8 rounded-2xl p-6 text-center">
            <p className="text-white font-semibold text-lg mb-2">{dict.lossTitle}</p>
            <p className="text-white/50 text-sm">{dict.lossText}</p>
          </div>
        </AnimateOnScroll>

        {/* Interactive revenue-loss calculator */}
        <AnimateOnScroll delay={120}>
          <div className="mt-8">
            <RevenueCalculator dict={calculator} currency={currency} audit={audit} locale={locale} />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
