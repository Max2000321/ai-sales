import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import type { DashboardDict } from '@/lib/i18n/types'

interface Props {
  dict: DashboardDict
}

const STAT_COLORS = [
  { color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { color: 'text-sky-600', bg: 'bg-sky-50' },
  { color: 'text-slate-400', bg: 'bg-slate-100' },
]

const DIALOG_VISUALS = [
  { time: '14:31', channel: 'In', channelColor: '#E1306C', channelBg: '#fdf2f8', statusColor: 'bg-emerald-100 text-emerald-700' },
  { time: '14:18', channel: 'Tg', channelColor: '#229ED9', channelBg: '#eff8ff', statusColor: 'bg-sky-100 text-sky-700' },
  { time: '13:55', channel: 'Wa', channelColor: '#25D366', channelBg: '#f0fdf4', statusColor: 'bg-amber-100 text-amber-700' },
  { time: '13:40', channel: 'In', channelColor: '#E1306C', channelBg: '#fdf2f8', statusColor: 'bg-emerald-100 text-emerald-700' },
  { time: '13:12', channel: 'Fb', channelColor: '#1877F2', channelBg: '#eff6ff', statusColor: 'bg-sky-100 text-sky-700' },
]

export default function DashboardPreview({ dict }: Props) {
  return (
    <section className="py-12 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{dict.subtitle}</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-slate-400 font-mono">app.dentai.io/dashboard</span>
            </div>

            <div className="flex" style={{ background: '#f8fafc' }}>
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-52 shrink-0 border-r border-slate-200 bg-white py-4">
                <div className="flex items-center gap-2 px-4 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">D</span>
                  </div>
                  <span className="font-bold text-slate-800 text-sm">DentAI</span>
                </div>
                {dict.nav.map((label, i) => (
                  <div key={label} className={`mx-2 px-3 py-2 rounded-lg text-sm mb-0.5 cursor-default ${i === 0 ? 'bg-indigo-600 text-white font-medium' : 'text-slate-500 hover:bg-slate-50'}`}>
                    {label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {dict.stats.map((s, i) => {
                    const c = STAT_COLORS[i] ?? STAT_COLORS[0]
                    return (
                      <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-slate-400">{s.label}</p>
                          <span className={`text-xs font-semibold ${c.color}`}>{s.delta}</span>
                        </div>
                        <p className={`text-2xl font-black ${c.color}`}>{s.value}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">{dict.dialogsTitle}</p>
                    <span className="text-xs text-slate-400">{dict.dialogsTime}</span>
                  </div>
                  {dict.dialogs.map((d, i) => {
                    const v = DIALOG_VISUALS[i] ?? DIALOG_VISUALS[0]
                    return (
                      <div key={d.name} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-default">
                        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                          {d.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-slate-800 truncate">{d.name}</p>
                            <span className="text-xs font-bold rounded px-1.5 py-0.5 shrink-0" style={{ background: v.channelBg, color: v.channelColor }}>{v.channel}</span>
                          </div>
                          <p className="text-xs text-slate-400 truncate">{d.preview}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-xs text-slate-400">{v.time}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${v.statusColor}`}>{d.status}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-900">{dict.ctaTitle}</p>
              <p className="text-slate-500 text-sm">{dict.ctaText}</p>
            </div>
            <Link href="/register" className="btn-shine shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2">
              {dict.ctaButton} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
