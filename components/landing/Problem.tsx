import { Moon, Clock, TrendingDown } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { ProblemDict } from '@/lib/i18n/types'

interface Props {
  dict: ProblemDict
}

// Visual config zipped by index to dict.cards (text only lives in the dictionary).
const VISUALS = [
  { Icon: Moon, iconColor: 'text-indigo-500', iconBg: 'bg-indigo-50' },
  { Icon: Clock, iconColor: 'text-amber-500', iconBg: 'bg-amber-50' },
  { Icon: TrendingDown, iconColor: 'text-red-500', iconBg: 'bg-red-50' },
]

export default function Problem({ dict }: Props) {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.cards.map((card, i) => {
            const v = VISUALS[i] ?? VISUALS[0]
            return (
              <AnimateOnScroll key={card.title} delay={i * 150}>
                <div className="border border-slate-200 rounded-2xl p-6 h-full bg-white hover:border-slate-300 hover:shadow-md transition-all">
                  <div className={`w-11 h-11 rounded-xl ${v.iconBg} flex items-center justify-center mb-5`}>
                    <v.Icon className={`w-5 h-5 ${v.iconColor}`} />
                  </div>
                  <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">{card.label}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{card.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{card.body}</p>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
