'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Loader2 } from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  widget_color: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatInterface({ agent }: { agent: Agent }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Привіт! Я ${agent.name}. Чим можу допомогти?` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const visitorId = useRef(Math.random().toString(36).slice(2))

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages(m => [...m, { role: 'user', content: text }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agent.id,
          message: text,
          conversationId,
          visitorId: visitorId.current,
        }),
      })
      const data = await res.json()
      if (data.conversationId) setConversationId(data.conversationId)
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Щось пішло не так. Спробуйте ще раз.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
      style={{ height: 'min(560px, calc(100vh - 32px))' }}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-3 shrink-0" style={{ backgroundColor: agent.widget_color }}>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{agent.name}</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <p className="text-white/80 text-xs">Онлайн · відповідає миттєво</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'text-white rounded-tr-sm'
                  : 'bg-slate-100 text-slate-700 rounded-tl-sm'
              }`}
              style={msg.role === 'user' ? { backgroundColor: agent.widget_color } : {}}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 px-3.5 py-2.5 rounded-2xl rounded-tl-sm">
              <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-3 border-t border-slate-100 flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Напишіть повідомлення..."
          disabled={loading}
          className="flex-1 bg-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-40 shrink-0"
          style={{ backgroundColor: agent.widget_color }}
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  )
}
