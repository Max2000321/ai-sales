'use client'

import { useEffect, useState } from 'react'
import { Send, Loader2, Check, Link2Off } from 'lucide-react'
import { createClient } from '@/lib/supabase'

type Lang = 'uk' | 'en' | 'cz'

const T: Record<Lang, Record<string, string>> = {
  uk: {
    title: 'Telegram-бот',
    sub: 'Підключіть бота, щоб агент відповідав пацієнтам у Telegram.',
    how: 'Як отримати токен: відкрийте @BotFather в Telegram → /newbot → скопіюйте токен.',
    placeholder: 'Вставте токен бота (123456:ABC-...)',
    connect: 'Підключити',
    connecting: 'Підключаємо...',
    disconnect: 'Відключити',
    connected: 'Підключено',
    open: 'Відкрити бота',
    businessHint: 'Щоб AI відповідав у вашому особистому Telegram: Налаштування → Telegram для бізнесу → Чат-боти → оберіть цього бота (потрібен Telegram Premium).',
    errInvalid: 'Невірний токен бота',
    errGeneric: 'Не вдалося підключити. Спробуйте ще раз.',
  },
  en: {
    title: 'Telegram bot',
    sub: 'Connect a bot so the agent answers patients in Telegram.',
    how: 'Get a token: open @BotFather in Telegram → /newbot → copy the token.',
    placeholder: 'Paste bot token (123456:ABC-...)',
    connect: 'Connect',
    connecting: 'Connecting...',
    disconnect: 'Disconnect',
    connected: 'Connected',
    open: 'Open bot',
    businessHint: 'To have the AI reply in your personal Telegram: Settings → Telegram Business → Chatbots → select this bot (Telegram Premium required).',
    errInvalid: 'Invalid bot token',
    errGeneric: 'Could not connect. Try again.',
  },
  cz: {
    title: 'Telegram bot',
    sub: 'Připojte bota, aby agent odpovídal pacientům v Telegramu.',
    how: 'Získání tokenu: otevřete @BotFather v Telegramu → /newbot → zkopírujte token.',
    placeholder: 'Vložte token bota (123456:ABC-...)',
    connect: 'Připojit',
    connecting: 'Připojuji...',
    disconnect: 'Odpojit',
    connected: 'Připojeno',
    open: 'Otevřít bota',
    businessHint: 'Aby AI odpovídala ve vašem osobním Telegramu: Nastavení → Telegram pro firmy → Chatboti → vyberte tohoto bota (vyžaduje Telegram Premium).',
    errInvalid: 'Neplatný token bota',
    errGeneric: 'Nepodařilo se připojit. Zkuste to znovu.',
  },
}

export default function TelegramConnect({ agentId, lang }: { agentId: string; lang: Lang }) {
  const t = T[lang]
  const [enabled, setEnabled] = useState(false)
  const [botUsername, setBotUsername] = useState<string | null>(null)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    ;(async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('agent_channels')
        .select('telegram_enabled')
        .eq('agent_id', agentId)
        .maybeSingle()
      if (active) {
        setEnabled(!!data?.telegram_enabled)
        setBotUsername(null)
        setToken('')
        setError('')
      }
    })()
    return () => { active = false }
  }, [agentId])

  async function connect() {
    if (!token.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/telegram/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, token: token.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error === 'Invalid bot token' ? t.errInvalid : t.errGeneric)
        return
      }
      setEnabled(true)
      setBotUsername(data.botUsername || null)
      setToken('')
    } catch {
      setError(t.errGeneric)
    } finally {
      setLoading(false)
    }
  }

  async function disconnect() {
    setLoading(true)
    setError('')
    try {
      await fetch('/api/telegram/connect', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId }),
      })
      setEnabled(false)
      setBotUsername(null)
    } catch {
      setError(t.errGeneric)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
          <Send className="w-4 h-4 text-sky-600" />
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
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {botUsername && (
              <a href={`https://t.me/${botUsername}`} target="_blank" rel="noreferrer"
                className="text-sm text-sky-600 font-medium hover:underline">
                @{botUsername} · {t.open}
              </a>
            )}
            <button onClick={disconnect} disabled={loading}
              className="ml-auto flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2Off className="w-4 h-4" />}
              {t.disconnect}
            </button>
          </div>
          <p className="text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">{t.businessHint}</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-slate-400 mb-3">{t.how}</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button onClick={connect} disabled={loading || !token.trim()}
              className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-700 disabled:opacity-50 transition-colors shrink-0">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {loading ? t.connecting : t.connect}
            </button>
          </div>
        </>
      )}

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </div>
  )
}
