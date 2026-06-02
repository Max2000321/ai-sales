'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Lang = 'uk' | 'en' | 'cz'

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'uk',
  setLang: () => {},
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('uk')

  useEffect(() => {
    const saved = localStorage.getItem('dash-lang') as Lang | null
    if (saved && ['uk', 'en', 'cz'].includes(saved)) setLangState(saved)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('dash-lang', l)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
