import { MessageCircle, Zap, ListChecks, CalendarCheck, CheckCircle2, Bot, Moon } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { FlowDict } from '@/lib/i18n/types'

interface Props {
  dict: FlowDict
}

const STEP_VISUALS = [
  { Icon: MessageCircle, iconColor: 'text-slate-600', bg: 'bg-slate-100', ring: '' },
  { Icon: Zap, iconColor: 'text-white', bg: 'bg-indigo-600', ring: 'ring-4 ring-indigo-100' },
  { Icon: ListChecks, iconColor: 'text-indigo-700', bg: 'bg-indigo-100', ring: '' },
  { Icon: CalendarCheck, iconColor: 'text-indigo-700', bg: 'bg-indigo-100', ring: '' },
  { Icon: CheckCircle2, iconColor: 'text-white', bg: 'bg-emerald-600', ring: '' },
]

const BENEFIT_VISUALS = [
  { Icon: Bot, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { Icon: Moon, color: 'text-slate-600', bg: 'bg-slate-100' },
  { Icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

export default function Flow({ dict }: Props) {
  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-slate-200 z-0" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-2 relative z-10">
              {dict.steps.map((item, i) => {
                const v = STEP_VISUALS[i] ?? STEP_VISUALS[0]
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-sm ${v.bg} ${v.ring}`}>
                      <v.Icon className={`w-8 h-8 ${v.iconColor}`} />
                    </div>
                    {item.time
                      ? <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mb-2">{item.time}</span>
                      : <div className="h-5 mb-2" />
                    }
                    <p className="font-bold text-slate-900 text-sm mb-1">{item.title}</p>
                    <p className="text-slate-500 text-xs leading-tight">{item.sub}</p>
                    {i < dict.steps.length - 1 && <div className="lg:hidden text-slate-300 text-xl my-2">↓</div>}
                  </div>
                )
              })}
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {dict.benefits.map((label, i) => {
              const v = BENEFIT_VISUALS[i] ?? BENEFIT_VISUALS[0]
              return (
                <div key={label} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                  <div className={`w-8 h-8 rounded-lg ${v.bg} flex items-center justify-center shrink-0`}>
                    <v.Icon className={`w-4 h-4 ${v.color}`} />
                  </div>
                  <p className="text-slate-700 font-medium text-sm">{label}</p>
                </div>
              )
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
