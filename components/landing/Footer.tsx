import Link from 'next/link'
import type { FooterDict } from '@/lib/i18n/types'

interface Props {
  dict: FooterDict
}

export default function Footer({ dict }: Props) {
  return (
    <footer className="border-t border-white/5 py-12" style={{ background: '#060910' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="text-white font-bold">DentAI</span>
            </div>
            <p className="text-white/30 text-sm max-w-xs">{dict.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/40">
            <a href="#how" className="hover:text-white/70 transition-colors">{dict.howItWorks}</a>
            <a href="#demo" className="hover:text-white/70 transition-colors">{dict.demo}</a>
            <Link href="/login" className="hover:text-white/70 transition-colors">{dict.signIn}</Link>
            <Link href="/register" className="hover:text-white/70 transition-colors">{dict.bookDemo}</Link>
            <a href={`mailto:${dict.email}`} className="hover:text-white/70 transition-colors">{dict.email}</a>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">{dict.privacy}</Link>
          </div>
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2 text-white/20 text-sm">
          <span>{dict.copyright}</span>
          <span>{dict.badges}</span>
        </div>
      </div>
    </footer>
  )
}
