'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bot, LogOut } from 'lucide-react'
import { useLang } from './LangProvider'
import { createClient } from '@/lib/supabase'

const PAGE_TITLES = {
  uk: {
    '/dashboard': 'Дашборд',
    '/analytics': 'Аналітика',
    '/knowledge': 'База знань',
    '/conversations': 'Розмови',
    '/embed': 'Вбудувати',
    '/settings': 'Налаштування',
  },
  en: {
    '/dashboard': 'Dashboard',
    '/analytics': 'Analytics',
    '/knowledge': 'Knowledge base',
    '/conversations': 'Conversations',
    '/embed': 'Embed',
    '/settings': 'Settings',
  },
  cz: {
    '/dashboard': 'Přehled',
    '/analytics': 'Analytika',
    '/knowledge': 'Znalostní báze',
    '/conversations': 'Konverzace',
    '/embed': 'Vložit',
    '/settings': 'Nastavení',
  },
}

export default function MobileHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { lang, setLang } = useLang()

  const titles = PAGE_TITLES[lang] as Record<string, string>
  const title = titles[pathname] ?? 'DentAI'

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 flex items-center justify-between px-4 h-14">
      {/* Logo + title */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-slate-900 text-sm">{title}</span>
      </div>

      {/* Right: lang + logout */}
      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs font-semibold">
          {(['uk', 'en', 'cz'] as const).map((l, i) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-1 transition-colors ${
                l === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-700'
              } ${i > 0 ? 'border-l border-slate-200' : ''}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
