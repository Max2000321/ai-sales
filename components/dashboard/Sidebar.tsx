'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bot, LayoutDashboard, BookOpen, MessageSquare, Settings, Code2, LogOut, BarChart2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useLang } from './LangProvider'

const NAV = {
  uk: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
    { href: '/analytics', icon: BarChart2, label: 'Аналітика' },
    { href: '/knowledge', icon: BookOpen, label: 'База знань' },
    { href: '/conversations', icon: MessageSquare, label: 'Розмови' },
    { href: '/embed', icon: Code2, label: 'Вбудувати' },
    { href: '/settings', icon: Settings, label: 'Налаштування' },
  ],
  en: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/analytics', icon: BarChart2, label: 'Analytics' },
    { href: '/knowledge', icon: BookOpen, label: 'Knowledge base' },
    { href: '/conversations', icon: MessageSquare, label: 'Conversations' },
    { href: '/embed', icon: Code2, label: 'Embed' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ],
  cz: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Přehled' },
    { href: '/analytics', icon: BarChart2, label: 'Analytika' },
    { href: '/knowledge', icon: BookOpen, label: 'Znalostní báze' },
    { href: '/conversations', icon: MessageSquare, label: 'Konverzace' },
    { href: '/embed', icon: Code2, label: 'Vložit' },
    { href: '/settings', icon: Settings, label: 'Nastavení' },
  ],
}

const LOGOUT_LABEL = { uk: 'Вийти', en: 'Sign out', cz: 'Odhlásit se' }

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { lang, setLang } = useLang()
  const navItems = NAV[lang]

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="hidden md:flex w-56 bg-white border-r border-slate-200 flex-col shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-base">DentAI</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Language switcher */}
      <div className="px-3 pb-2">
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs font-semibold">
          {(['uk', 'en', 'cz'] as const).map((l, i) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`flex-1 py-1.5 transition-colors ${
                l === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-700'
              } ${i > 0 ? 'border-l border-slate-200' : ''}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          {LOGOUT_LABEL[lang]}
        </button>
      </div>
    </aside>
  )
}
