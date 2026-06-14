import { Star } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { TestimonialsDict } from '@/lib/i18n/types'

interface Props {
  dict: TestimonialsDict
}

// Avatar colors are locale-invariant; zipped by index to dict.items.
const AVATAR_COLORS = ['#4F46E5', '#0EA5E9', '#10B981']

export default function Testimonials({ dict }: Props) {
  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.items.map((t, i) => (
            <AnimateOnScroll key={t.name} delay={i * 150}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: AVATAR_COLORS[i] ?? AVATAR_COLORS[0] }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role} · {t.clinic}</p>
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
