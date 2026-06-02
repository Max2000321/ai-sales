'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Code2, Copy, Check } from 'lucide-react'
import { useLang } from '@/components/dashboard/LangProvider'

const T = {
  uk: {
    title: 'Вбудувати на сайт', sub: 'Скопіюйте код і вставте перед закриваючим тегом </body>',
    agentLabel: 'Агент', noAgent: 'Спочатку створіть агента в Налаштуваннях',
    copy: 'Скопіювати', copied: 'Скопійовано!', directLink: 'Пряме посилання на чат:',
  },
  en: {
    title: 'Embed on your website', sub: 'Copy the code and paste it before the closing </body> tag',
    agentLabel: 'Agent', noAgent: 'First create an agent in Settings',
    copy: 'Copy', copied: 'Copied!', directLink: 'Direct chat link:',
  },
  cz: {
    title: 'Vložit na web', sub: 'Zkopírujte kód a vložte ho před uzavírací tag </body>',
    agentLabel: 'Agent', noAgent: 'Nejprve vytvořte agenta v Nastavení',
    copy: 'Kopírovat', copied: 'Zkopírováno!', directLink: 'Přímý odkaz na chat:',
  },
}

interface Agent { id: string; name: string; widget_color: string }

export default function EmbedPage() {
  const { lang } = useLang()
  const t = T[lang]
  const [agents, setAgents] = useState<Agent[]>([])
  const [selected, setSelected] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase.from('agents').select('id, name, widget_color').eq('user_id', user!.id)
      setAgents(data || [])
      if (data?.[0]) setSelected(data[0].id)
    }
    load()
  }, [])

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ai-sales-iota-three.vercel.app'
  const agent = agents.find(a => a.id === selected)
  const embedCode = agent
    ? `<iframe\n  src="${appUrl}/chat/${agent.id}"\n  style="position:fixed;bottom:20px;right:20px;width:380px;height:560px;border:none;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:9999"\n  title="${agent.name}"\n></iframe>`
    : ''

  async function copy() {
    await navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{t.title}</h1>
        <p className="text-slate-500 text-sm">{t.sub}</p>
      </div>

      {agents.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">{t.noAgent}</div>
      ) : (
        <div className="max-w-2xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.agentLabel}</label>
            <select value={selected} onChange={e => setSelected(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 rounded-t-xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Code2 className="w-3.5 h-3.5" /> HTML
              </div>
              <button onClick={copy} className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.copied : t.copy}
              </button>
            </div>
            <pre className="p-5 text-sm text-indigo-300 bg-slate-900 overflow-auto rounded-b-xl"><code>{embedCode}</code></pre>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 text-sm text-blue-700">
            <p className="font-medium mb-1">{t.directLink}</p>
            <a href={`/chat/${selected}`} target="_blank" className="text-indigo-600 hover:underline break-all">
              {appUrl}/chat/{selected}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
