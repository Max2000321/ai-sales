'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { FaqDict } from '@/lib/i18n/types'

interface Props {
  dict: FaqDict
}

export default function Faq({ dict }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{dict.title}</h2>
            <p className="text-slate-500">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <div className="space-y-2">
            {dict.items.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-900 text-sm md:text-base pr-4 min-w-0 break-words whitespace-normal">{faq.q}</span>
                  <ChevronDown
                    className="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                    style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 min-w-0 break-words whitespace-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
