import { Lock, Shield, MessageSquare } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { TrustItem } from '@/lib/i18n/types'

interface Props {
  items: TrustItem[]
}

const ICONS = [Lock, Shield, MessageSquare]

export default function Trust({ items }: Props) {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? ICONS[0]
            return (
              <AnimateOnScroll key={item.title}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
