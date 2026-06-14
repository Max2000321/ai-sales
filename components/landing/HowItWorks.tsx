import AnimateOnScroll from './AnimateOnScroll'
import type { HowItWorksDict } from '@/lib/i18n/types'

interface Props {
  dict: HowItWorksDict
}

export default function HowItWorks({ dict }: Props) {
  return (
    <section id="how" className="py-12 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px bg-slate-200" />
          {dict.steps.map((step, i) => (
            <AnimateOnScroll key={step.title} delay={(i + 1) * 100}>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 relative">
                <div className="text-5xl font-black text-slate-100 mb-4 leading-none">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
