import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { HeroDict } from '@/lib/i18n/types'

interface Props {
  dict: HeroDict
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
  )
}

export default function Hero({ dict }: Props) {
  const { chat } = dict
  return (
    <section className="pt-16" style={{ background: 'linear-gradient(160deg, #0a0e1a 0%, #111627 60%, #0f1320 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <AnimateOnScroll delay={0}>
              <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                {dict.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] mb-6 text-balance">
                {dict.headlineLead.map((line, i) => (
                  <span key={i}>{line}<br className="hidden sm:block" />{' '}</span>
                ))}
                <span className="text-indigo-400">{dict.headlineHighlight}</span>
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <p className="text-lg text-white/60 leading-relaxed mb-6 max-w-lg">{dict.subtitle}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {dict.pills.map((t) => (
                  <span key={t} className="text-xs font-semibold bg-white/8 border border-white/10 text-white/70 px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link href="/register" className="btn-shine flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors text-base">
                  {dict.ctaPrimary}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#demo" className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-6 py-3.5 rounded-xl font-medium transition-colors text-base">
                  {dict.ctaSecondary}
                </a>
              </div>
              <p className="text-white/35 text-sm mb-8">{dict.disclaimer}</p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/40">
                {dict.trust.map((t) => (
                  <span key={t} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> {t}</span>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* Hero chat preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-xs">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ background: '#141827' }}>
                <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">ID</div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#141827]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs">{chat.name}</p>
                    <p className="text-emerald-400 text-xs">{chat.status}</p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {chat.bubbles.map((b, i) =>
                    b.role === 'ai' ? (
                      <div key={i} className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                        {b.text}
                      </div>
                    ) : (
                      <div key={i} className="bg-indigo-600 text-white text-xs px-3 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto">
                        {b.text}
                      </div>
                    )
                  )}
                </div>
                <div className="px-3 py-2 border-t border-white/10 flex items-center gap-2">
                  <div className="flex-1 rounded-lg px-3 py-1.5 text-white/30 text-xs" style={{ background: '#1e2540' }}>
                    {chat.placeholder}
                  </div>
                  <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <SendIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <p className="text-center text-white/30 text-xs mt-3">{chat.footer}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
