import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { FinalCtaDict } from '@/lib/i18n/types'

interface Props {
  dict: FinalCtaDict
}

export default function FinalCta({ dict }: Props) {
  return (
    <section className="py-24" style={{ background: '#0a0e1a' }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <AnimateOnScroll>
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">{dict.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            {dict.title.map((line, i) => (
              <span key={i}>{line}{i < dict.title.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="text-white/50 text-lg mb-8">{dict.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register" className="btn-shine flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-base transition-colors">
              {dict.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#demo" className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/60 hover:text-white px-8 py-4 rounded-xl font-medium text-base transition-colors">
              {dict.ctaSecondary}
            </a>
          </div>
          <p className="text-white/30 text-sm mt-6">{dict.disclaimer}</p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
