import { Zap, Check } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import DemoChat from './DemoChat'
import type { DemoDict, DemoChatDict, Locale } from '@/lib/i18n/types'

interface Props {
  dict: DemoDict
  chatDict: DemoChatDict
  locale: Locale
}

export default function Demo({ dict, chatDict, locale }: Props) {
  return (
    <section id="demo" className="py-12 md:py-24" style={{ background: '#0a0e1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div>
              <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                <Zap className="w-3.5 h-3.5" />
                {dict.badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">{dict.title}</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">{dict.subtitle}</p>
              <div className="space-y-3">
                {dict.bullets.map((t) => (
                  <div key={t} className="flex items-start gap-3 text-white/70 text-sm">
                    <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="min-w-0 break-words whitespace-normal leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150}>
            <DemoChat dict={chatDict} locale={locale} />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
