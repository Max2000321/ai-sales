import Link from 'next/link'
import type { Locale, NavDict } from '@/lib/i18n/types'

interface Props {
  dict: NavDict
  locale: Locale
}

const LANGS: { code: Locale; label: string; href: string }[] = [
  { code: 'uk', label: 'UA', href: '/' },
  { code: 'en', label: 'EN', href: '/en' },
  { code: 'cz', label: 'CZ', href: '/cz' },
]

export default function Nav({ dict, locale }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md" style={{ background: 'rgba(10,14,26,0.92)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div>
            <span className="text-white font-bold text-base">DentAI</span>
            <span className="hidden sm:inline text-white/40 text-xs ml-2">{dict.tagline}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#how" className="hidden md:block text-white/60 hover:text-white text-sm transition-colors">{dict.howItWorks}</a>
          <a href="#demo" className="hidden md:block text-white/60 hover:text-white text-sm transition-colors">{dict.demo}</a>

          {/* Language switcher — active locale highlighted */}
          <div className="flex items-center border border-white/15 rounded-lg overflow-hidden text-xs font-semibold">
            {LANGS.map((lang, i) => {
              const active = lang.code === locale
              const border = i > 0 ? 'border-l border-white/10' : ''
              return active ? (
                <span key={lang.code} className={`px-2.5 py-1.5 bg-white/15 text-white font-semibold ${border}`}>
                  {lang.label}
                </span>
              ) : (
                <Link
                  key={lang.code}
                  href={lang.href}
                  className={`px-2.5 py-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors ${border}`}
                >
                  {lang.label}
                </Link>
              )
            })}
          </div>

          <Link href="/login" className="hidden sm:block text-white/60 hover:text-white text-sm transition-colors">{dict.signIn}</Link>
          <Link
            href="/register"
            className="btn-shine bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
          >
            <span className="sm:hidden">{dict.bookDemoShort}</span>
            <span className="hidden sm:inline">{dict.bookDemo}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
