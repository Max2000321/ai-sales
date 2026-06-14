'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import type { DemoChatDict } from '@/lib/i18n/types'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  dict: DemoChatDict
}

export default function FloatingChat({ dict }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  // Seed with the AI greeting (shown without an API call); counts as 1 unread.
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: dict.initial }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)

  const scrollRef = useRef<HTMLDivElement>(null)
  const hasUserMessage = messages.some((m) => m.role === 'user')

  // First-visit tooltip: show after 3s, auto-hide after a further 5s.
  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 3000)
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  // Auto-scroll the message list to the bottom on new content (not the page).
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, isLoading])

  function openChat() {
    setIsOpen(true)
    setShowTooltip(false)
    setUnreadCount(0)
  }

  function closeChat() {
    setIsOpen(false)
  }

  function toggle() {
    if (isOpen) closeChat()
    else openChat()
  }

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const history = messages.map((m) => ({ role: m.role, content: m.content }))
    setMessages((m) => [...m, { role: 'user', content: trimmed }])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: history.slice(-8) }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      if (!data.reply) throw new Error('Empty reply')
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
      if (!isOpen) setUnreadCount((c) => c + 1)
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: dict.error }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* ── Chat panel (CSS-transition driven by isOpen, always mounted) ── */}
      <div
        className="fixed bottom-[88px] right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[360px] h-[65vh] sm:h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        style={{
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transformOrigin: 'bottom right',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-100 shrink-0">
          <div className="relative">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">AI</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-900">Ivory Dental</div>
            <div className="text-xs text-green-500">● {dict.online}</div>
          </div>
          <button onClick={closeChat} aria-label="Close chat" className="ml-auto text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-1 p-3 bg-gray-100 rounded-xl w-fit">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Quick replies — only before the first user message */}
        {!hasUserMessage && (
          <div className="px-3 pb-1 flex gap-1.5 shrink-0">
            {dict.quickActions.map(({ label, message }) => (
              <button
                key={label}
                onClick={() => send(message)}
                disabled={isLoading}
                className="flex-1 text-center text-xs text-blue-600 border border-blue-200 rounded-lg px-2 py-1.5 hover:bg-blue-50 transition-colors disabled:opacity-40 truncate"
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(input) }}
          className="p-3 border-t border-slate-100 flex gap-2 items-end shrink-0"
        >
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
            placeholder={dict.placeholder}
            disabled={isLoading}
            className="flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-40 max-h-24"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send"
            className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-40 hover:bg-blue-500 shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
          </button>
        </form>
      </div>

      {/* ── Tooltip teaser ── */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-[88px] right-4 sm:right-6 z-50 bg-white rounded-xl shadow-lg p-3 w-48 text-sm text-slate-700 border border-slate-100">
          {dict.tooltip}
        </div>
      )}

      {/* ── Trigger button ── */}
      <button
        onClick={toggle}
        aria-label="Open chat"
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg flex items-center justify-center text-white transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>
    </>
  )
}
