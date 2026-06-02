'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const CONTENT = {
  uk: {
    initial: "Добрий день! Я AI-адміністратор клініки Ivory Dental. Можу записати вас на прийом, розповісти про послуги та ціни. Чим можу допомогти?",
    suggestions: [
      "Скільки коштує чищення зубів?",
      "Хочу записатись на прийом",
      "Є імпланти? Яка ціна?",
      "Працюєте у вихідні?",
    ],
    placeholder: "Напишіть запитання...",
    online: "відповідає миттєво",
    error: "Вибачте, сталася помилка. Спробуйте ще раз.",
  },
  en: {
    initial: "Hello! I'm the AI administrator for Ivory Dental Clinic. I can book your appointment and answer any questions about our services and prices. How can I help?",
    suggestions: [
      "How much is teeth cleaning?",
      "I'd like to book an appointment",
      "What are your implant prices?",
      "Do you work on weekends?",
    ],
    placeholder: "Write a message...",
    online: "replies instantly",
    error: "Something went wrong. Please try again.",
  },
  cz: {
    initial: "Dobrý den! Jsem AI administrátor ordinace Ivory Dental. Mohu vám zarezervovat schůzku a odpovědět na otázky o našich službách a cenách. Jak vám mohu pomoci?",
    suggestions: [
      "Kolik stojí čištění zubů?",
      "Chci si objednat termín",
      "Jaké jsou ceny implantátů?",
      "Ordinujete o víkendu?",
    ],
    placeholder: "Napište zprávu...",
    online: "odpovídá okamžitě",
    error: "Něco se pokazilo. Zkuste to prosím znovu.",
  },
}

interface Props {
  lang?: 'uk' | 'en' | 'cz'
}

export default function DemoChat({ lang = 'uk' }: Props) {
  const c = CONTENT[lang] ?? CONTENT['uk']
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: c.initial }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(text: string) {
    if (!text.trim() || loading) return
    setShowSuggestions(false)
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
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: c.error }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden flex flex-col border border-white/10 shadow-2xl" style={{ height: 460, background: '#1a1f35' }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10" style={{ background: '#141827' }}>
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
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
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

        {showSuggestions && !loading && messages.length === 1 && (
          <div className="space-y-1.5 pt-1">
            {c.suggestions.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="block w-full text-left text-xs text-indigo-300 border border-indigo-500/30 rounded-xl px-3 py-2 hover:bg-indigo-600/20 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={e => { e.preventDefault(); send(input) }}
        className="p-3 border-t border-white/10 flex gap-2"
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
          className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-40 hover:bg-indigo-500"
        >
          {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
        </button>
      </form>
    </div>
  )
}
