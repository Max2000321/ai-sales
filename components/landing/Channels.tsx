import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { ChannelsDict } from '@/lib/i18n/types'

interface Props {
  dict: ChannelsDict
}

const CHANNEL_VISUALS = [
  { color: '#E1306C', bg: '#fdf2f8', letter: 'In' },
  { color: '#1877F2', bg: '#eff6ff', letter: 'Fb' },
  { color: '#229ED9', bg: '#eff8ff', letter: 'Tg' },
  { color: '#25D366', bg: '#f0fdf4', letter: 'Wa' },
  { color: '#7360F2', bg: '#f5f3ff', letter: 'Vi' },
  { color: '#4F46E5', bg: '#eef2ff', letter: 'Web' },
]

export default function Channels({ dict }: Props) {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {dict.names.map((name, i) => {
            const v = CHANNEL_VISUALS[i] ?? CHANNEL_VISUALS[0]
            return (
              <AnimateOnScroll key={name} delay={i * 60}>
                <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all cursor-default">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: v.bg, color: v.color }}>
                    {v.letter}
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{name}</span>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
        <AnimateOnScroll delay={200}>
          <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-900">{dict.ctaTitle}</p>
              <p className="text-slate-500 text-sm">{dict.ctaText}</p>
            </div>
            <Link href="/register" className="btn-shine shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2">
              {dict.ctaButton} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
