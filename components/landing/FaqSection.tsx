'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'What languages does the AI respond in?',
    a: 'The AI responds in the same language the customer writes in. If they write in English, Spanish, French, German or any other major language — it automatically replies in that language.',
  },
  {
    q: 'What if the AI gives a wrong answer?',
    a: 'The AI only answers based on the content you upload to the knowledge base. If it doesn\'t know something, it politely says so and suggests contacting your team. You stay in full control of what it knows.',
  },
  {
    q: 'Can I customize the communication style?',
    a: 'Yes — when creating an agent you set a system prompt that defines its tone: formal, friendly, concise, detailed. You can also give it a custom name and brand color.',
  },
  {
    q: 'How quickly can I launch?',
    a: 'Most customers go from sign-up to a working chat widget in under 10 minutes. You upload your FAQ or product description, copy one line of code to your website, and you\'re live.',
  },
  {
    q: 'Are my documents safe?',
    a: 'Yes. Your documents are stored securely in your private account, encrypted at rest, and never shared with other users or used to train AI models. You can delete them at any time.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {FAQS.map((faq, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-900 text-sm md:text-base">{faq.q}</span>
            <ChevronDown
              className="w-5 h-5 text-slate-400 shrink-0 ml-4 transition-transform duration-200"
              style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
