import AnimateOnScroll from './AnimateOnScroll'
import type { StatItem } from '@/lib/i18n/types'

interface Props {
  stats: StatItem[]
}

export default function StatsBar({ stats }: Props) {
  return (
    <section className="bg-indigo-600 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-indigo-500">
          {stats.map(({ stat, text, sub }, i) => (
            <AnimateOnScroll key={stat} delay={i * 100} className="text-center md:px-8">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat}</p>
              <p className="text-indigo-100 text-sm font-medium mb-0.5">{text}</p>
              <p className="text-indigo-300 text-xs">{sub}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
