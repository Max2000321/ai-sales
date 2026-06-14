import Link from 'next/link'
import { Check } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { PricingDict } from '@/lib/i18n/types'

interface Props {
  dict: PricingDict
}

export default function Pricing({ dict }: Props) {
  return (
    <section className="relative overflow-hidden py-12 md:py-24 bg-white">
      {/* soft background blob behind the cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-100 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {dict.plans.map((plan, i) => (
            <AnimateOnScroll key={plan.name} delay={i * 150}>
              <div
                className={`rounded-2xl p-6 border h-full flex flex-col relative transition-transform duration-300 ease-out hover:scale-[1.02] hover:shadow-xl ${
                  plan.highlight
                    ? 'bg-indigo-600 border-indigo-600 ring-2 ring-blue-500 ring-offset-2 shadow-xl shadow-blue-500/20'
                    : 'bg-white border-slate-200'
                }`}
              >
                {plan.highlight && plan.popularBadge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.popularBadge}
                  </div>
                )}
                <div className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{plan.name}</div>
                <div className={`text-xs mb-3 ${plan.highlight ? 'text-indigo-300' : 'text-slate-400'}`}>{plan.desc}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-3xl font-black ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${plan.highlight ? 'text-indigo-100' : 'text-slate-600'}`}>
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-indigo-300' : 'text-indigo-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={`btn-shine block text-center py-3 rounded-xl text-sm font-semibold transition-colors ${
                    plan.highlight ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.cta}
                </Link>
                {plan.trialNote && (
                  <p className={`text-center text-xs mt-2.5 ${plan.highlight ? 'text-indigo-300' : 'text-slate-400'}`}>
                    {plan.trialNote}
                  </p>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll delay={200}>
          <p className="text-center text-slate-400 text-sm mt-6">{dict.footnote}</p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
