'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import type { DemoChatDict } from '@/lib/i18n/types'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  dict: DemoChatDict
}

export default function DemoChat({ dict }: Props) {
  const c = dict
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: c.initial }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll only the message list, never the page — scrollIntoView would drag
    // the whole window to this mid-page section on mount.
    const container = bottomRef.current?.parentElement
    if (container) container.scrollTop = container.scrollHeight
  }, [messages])

  async function send(text: string) {
    if (!text.trim() || loading) return
    setHasError(false)
    const userMsg: Message = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      if (!data.reply) throw new Error('Empty reply')
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setHasError(true)
      setMessages(m => [...m, { role: 'assistant', content: c.error }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden flex flex-col border border-white/10 shadow-2xl" style={{ height: 520, background: '#1a1f35' }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10 shrink-0" style={{ background: '#141827' }}>
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            ID
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#141827]" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Ivory Dental</p>
          <p className="text-emerald-400 text-xs">{c.online}</p>
        </div>
        <div className="ml-auto text-xs text-white/40">demo</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-sm'
                  : 'text-white/90 rounded-tl-sm'
              }`}
              style={msg.role === 'assistant' ? { background: '#252c45' } : {}}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm" style={{ background: '#252c45' }}>
              <div className="flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick actions — always visible */}
      <div className="px-3 pt-2 pb-1 flex gap-1.5 shrink-0" style={{ background: '#1a1f35' }}>
        {c.quickActions.map(({ label, message }) => (
          <button
            key={label}
            onClick={() => send(message)}
            disabled={loading}
            className="flex-1 text-center text-xs text-indigo-300 border border-indigo-500/30 rounded-lg px-2 py-1.5 hover:bg-indigo-600/20 transition-colors disabled:opacity-40 truncate"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={e => { e.preventDefault(); send(input) }}
        className="p-3 border-t border-white/10 flex gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={c.placeholder}
          disabled={loading}
          className="flex-1 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-40"
          style={{ background: '#252c45' }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-40 hover:bg-indigo-500 shrink-0"
        >
          {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
        </button>
      </form>
    </div>
  )
}
