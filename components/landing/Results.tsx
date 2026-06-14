import { TrendingUp, Clock, MessageSquare, Shield } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { ResultsDict } from '@/lib/i18n/types'

interface Props {
  dict: ResultsDict
}

const VISUALS = [
  { Icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { Icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { Icon: MessageSquare, color: 'text-sky-600', bg: 'bg-sky-50' },
  { Icon: Shield, color: 'text-violet-600', bg: 'bg-violet-50' },
]

export default function Results({ dict }: Props) {
  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {dict.items.map((r, i) => {
            const v = VISUALS[i] ?? VISUALS[0]
            return (
              <AnimateOnScroll key={r.label} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 text-center hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${v.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <v.Icon className={`w-6 h-6 ${v.color}`} />
                  </div>
                  <p className={`text-3xl font-black ${v.color} mb-2`}>{r.value}</p>
                  <p className="text-slate-600 text-sm leading-tight">{r.label}</p>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
