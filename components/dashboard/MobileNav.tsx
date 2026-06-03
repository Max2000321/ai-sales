'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, BookOpen, MessageSquare, Settings, BarChart2, LogOut } from 'lucide-react'
import { useLang } from './LangProvider'
import { createClient } from '@/lib/supabase'

const NAV = {
  uk: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
    { href: '/analytics', icon: BarChart2, label: 'Аналітика' },
    { href: '/conversations', icon: MessageSquare, label: 'Розмови' },
    { href: '/knowledge', icon: BookOpen, label: 'База знань' },
    { href: '/settings', icon: Settings, label: 'Агент' },
  ],
  en: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/analytics', icon: BarChart2, label: 'Analytics' },
    { href: '/conversations', icon: MessageSquare, label: 'Chat' },
    { href: '/knowledge', icon: BookOpen, label: 'Knowledge' },
    { href: '/settings', icon: Settings, label: 'Agent' },
  ],
  cz: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Přehled' },
    { href: '/analytics', icon: BarChart2, label: 'Analytika' },
    { href: '/conversations', icon: MessageSquare, label: 'Chaty' },
    { href: '/knowledge', icon: BookOpen, label: 'Znalosti' },
    { href: '/settings', icon: Settings, label: 'Agent' },
  ],
}

export default function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { lang } = useLang()
  const navItems = NAV[lang]

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 flex items-stretch h-16 safe-area-bottom" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {navItems.map(({ href, icon: Icon, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
              active ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="text-[10px] font-medium leading-none">{label}</span>
            {active && <span className="absolute bottom-0 w-8 h-0.5 bg-indigo-600 rounded-t-full" />}
          </Link>
        )
      })}
    </nav>
  )
}
