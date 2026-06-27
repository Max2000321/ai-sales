'use client'

import { useEffect, useState } from 'react'
import { Camera, Loader2, Check, Link2Off } from 'lucide-react'
import { createClient } from '@/lib/supabase'

type Lang = 'uk' | 'en' | 'cz'

const T: Record<Lang, Record<string, string>> = {
  uk: {
    title: 'Instagram Direct',
    sub: 'Підключіть бізнес-акаунт Instagram — агент відповідатиме в директі.',
    req: 'Потрібен бізнес-акаунт Instagram, прив’язаний до сторінки Facebook.',
    connect: 'Підключити Instagram',
    disconnect: 'Відключити',
    connected: 'Підключено',
    okMsg: 'Instagram підключено!',
    errMsg: 'Не вдалося підключити Instagram',
  },
  en: {
    title: 'Instagram Direct',
    sub: 'Connect an Instagram business account — the agent answers in DMs.',
    req: 'Requires an Instagram business account linked to a Facebook Page.',
    connect: 'Connect Instagram',
    disconnect: 'Disconnect',
    connected: 'Connected',
    okMsg: 'Instagram connected!',
    errMsg: 'Could not connect Instagram',
  },
  cz: {
    title: 'Instagram Direct',
    sub: 'Připojte firemní účet Instagram — agent odpovídá v DM.',
    req: 'Vyžaduje firemní účet Instagram propojený se stránkou Facebook.',
    connect: 'Připojit Instagram',
    disconnect: 'Odpojit',
    connected: 'Připojeno',
    okMsg: 'Instagram připojen!',
    errMsg: 'Nepodařilo se připojit Instagram',
  },
}

export default function InstagramConnect({ agentId, lang }: { agentId: string; lang: Lang }) {
  const t = T[lang]
  const [enabled, setEnabled] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [flash, setFlash] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)

  useEffect(() => {
    let active = true
    ;(async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('agent_channels')
        .select('instagram_enabled, instagram_username')
        .eq('agent_id', agentId)
        .maybeSingle()
      if (active) {
        setEnabled(!!data?.instagram_enabled)
        setUsername(data?.instagram_username || null)
      }
    })()
    return () => { active = false }
  }, [agentId])

  // Surface the OAuth round-trip result (?ig=ok|error).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const ig = p.get('ig')
    if (!ig) return
    if (ig === 'ok') setFlash({ kind: 'ok', text: t.okMsg })
    else setFlash({ kind: 'error', text: `${t.errMsg} (${p.get('ig_detail') || ''})` })
    const u = new URL(window.location.href)
    u.searchParams.delete('ig'); u.searchParams.delete('ig_detail')
    window.history.replaceState({}, '', u.toString())
  }, [t])

  function connect() {
    setLoading(true)
    window.location.href = `/api/instagram/connect?agentId=${encodeURIComponent(agentId)}`
  }

  async function disconnect() {
    setLoading(true)
    try {
      await fetch('/api/instagram/connect', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId }),
      })
      setEnabled(false)
      setUsername(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-lg bg-pink-100 flex items-center justify-center">
          <Camera className="w-4 h-4 text-pink-600" />
        </div>
        <h2 className="font-semibold text-slate-900">{t.title}</h2>
        {enabled && (
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <Check className="w-3.5 h-3.5" /> {t.connected}
          </span>
        )}
      </div>
      <p className="text-slate-500 text-sm mb-4">{t.sub}</p>

      {enabled ? (
        <div className="flex items-center gap-3">
          {username && <span className="text-sm text-pink-600 font-medium">@{username}</span>}
          <button onClick={disconnect} disabled={loading}
            className="ml-auto flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2Off className="w-4 h-4" />}
            {t.disconnect}
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-slate-400 mb-3">{t.req}</p>
          <button onClick={connect} disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
            {t.connect}
          </button>
        </>
      )}

      {flash && (
        <p className={`text-sm mt-3 ${flash.kind === 'ok' ? 'text-emerald-600' : 'text-red-600'}`}>{flash.text}</p>
      )}
    </div>
  )
}
