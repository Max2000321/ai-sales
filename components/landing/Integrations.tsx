import { PlugZap, CalendarCheck } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { IntegrationsDict } from '@/lib/i18n/types'

interface Props {
  dict: IntegrationsDict
}

export default function Integrations({ dict }: Props) {
  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 border border-indigo-200 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              <PlugZap className="w-3.5 h-3.5" />
              {dict.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">{dict.microcopy}</p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
