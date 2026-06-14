import { RefreshCw, CalendarCheck } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { IntegrationsDict } from '@/lib/i18n/types'

interface Props {
  dict: IntegrationsDict
}

/** Compact stylized monogram used as a placeholder "logo" for each MIS. */
function monogram(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9]/g, '')
  return cleaned.slice(0, 2).toUpperCase()
}

export default function Integrations({ dict }: Props) {
  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 border border-indigo-200 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              <RefreshCw className="w-3.5 h-3.5" />
              {dict.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>

        <div className="space-y-8">
          {dict.groups.map((group, gi) => (
            <AnimateOnScroll key={group.label} delay={gi * 120}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3 text-center md:text-left">{group.label}</p>
                <div className="relative">
                  {/* Mobile: horizontal snap-swipe row · Desktop: responsive grid */}
                  <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-1 pr-6 md:pr-0">
                    {group.systems.map((sys) => (
                      <div
                        key={sys}
                        className="snap-start shrink-0 w-40 md:w-auto flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-indigo-300 hover:shadow-sm transition-all"
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {monogram(sys)}
                        </div>
                        <span className="font-semibold text-slate-800 text-sm truncate">{sys}</span>
                      </div>
                    ))}
                    {/* trailing spacer so the last badge never snaps flush to the edge */}
                    <div aria-hidden className="shrink-0 w-1 md:hidden" />
                  </div>
                  {/* Right-edge fade hints there's more to swipe (mobile only) */}
                  <div className="md:hidden pointer-events-none absolute top-0 right-0 bottom-1 w-12 bg-gradient-to-l from-slate-50 via-slate-50/60 to-transparent" />
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={150}>
          <div className="mt-10 flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">{dict.microcopy}</p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
