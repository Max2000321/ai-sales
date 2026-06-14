import AnimateOnScroll from './AnimateOnScroll'
import type { ScenariosDict } from '@/lib/i18n/types'

interface Props {
  dict: ScenariosDict
}

export default function Scenarios({ dict }: Props) {
  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {dict.items.map((s, i) => (
            <AnimateOnScroll key={s.tag} delay={i * 100}>
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{s.tag}</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-indigo-600 text-white text-sm px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%]">{s.patient}</div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-700 text-sm px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%]">{s.ai}</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
