'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Mail, Phone, MessageSquare } from 'lucide-react'
import PhoneInput from '@/components/landing/PhoneInput'
import { localeFromPathname, validatePhone } from '@/lib/validation/phone'

export default function ContactPage() {
  const pathname = usePathname()
  const phoneLocale = localeFromPathname(pathname)

  const [form, setForm] = useState({ name: '', clinic: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [phoneValid, setPhoneValid] = useState(false)
  const [phoneSubmitError, setPhoneSubmitError] = useState(false)
  const phoneRef = useRef<HTMLInputElement>(null)

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validatePhone(form.phone, phoneLocale)) {
      setPhoneSubmitError(true)
      phoneRef.current?.focus()
      return
    }
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: '#0a0e1a' }}>

      {/* Nav */}
      <nav className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-white font-bold text-base">DentAI</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            На головну
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — info */}
          <div>
            <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              Тариф «Мережа»
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              Зв&apos;яжіться з нами
            </h1>
            <p className="text-white/60 leading-relaxed mb-8 text-lg">
              Для мереж клінік ми готуємо індивідуальне рішення. Залиште заявку — наш менеджер
              зв&apos;яжеться з вами протягом 2 годин і розповість про можливості та ціни.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-white/8 bg-white/4">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Персональна демонстрація</p>
                  <p className="text-white/50 text-sm">Покажемо систему на прикладі вашої мережі — з вашими каналами та брендингом</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-white/8 bg-white/4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Дзвінок з менеджером</p>
                  <p className="text-white/50 text-sm">Обговоримо ваші задачі, масштаб і технічні вимоги до інтеграцій</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-white/8 bg-white/4">
                <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Email</p>
                  <a href="mailto:hello@dentai.app" className="text-sky-400 hover:text-sky-300 text-sm transition-colors">hello@dentai.app</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-white/10 p-8" style={{ background: '#141827' }}>
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-white font-bold text-xl mb-3">Заявку отримано!</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Наш менеджер зв&apos;яжеться з вами протягом 2 годин у робочий час.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  На головну
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-white font-bold text-lg mb-6">Залишити заявку</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-1.5">Ваше ім&apos;я *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="Іван Петренко"
                      className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-white/10"
                      style={{ background: '#1e2540' }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-1.5">Назва мережі *</label>
                    <input
                      type="text"
                      required
                      value={form.clinic}
                      onChange={e => update('clinic', e.target.value)}
                      placeholder="SmilePlus, 3 клініки"
                      className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-white/10"
                      style={{ background: '#1e2540' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5">Телефон *</label>
                  <PhoneInput
                    ref={phoneRef}
                    locale={phoneLocale}
                    value={form.phone}
                    onChange={v => { update('phone', v); if (phoneSubmitError) setPhoneSubmitError(false) }}
                    onValidChange={setPhoneValid}
                    forceError={phoneSubmitError}
                    required
                    className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-white/10 bg-[#1e2540]"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="ivan@smileplus.ua"
                    className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-white/10"
                    style={{ background: '#1e2540' }}
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5">Коментар</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Кількість клінік, поточні канали, особливі вимоги..."
                    className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-white/10 resize-none"
                    style={{ background: '#1e2540' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !phoneValid}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  {loading ? 'Відправляємо...' : 'Відправити заявку'}
                </button>

                {error && (
                  <p className="text-red-400 text-xs text-center bg-red-500/10 rounded-lg py-2">
                    Щось пішло не так. Спробуйте ще раз або напишіть на hello@dentai.app
                  </p>
                )}

                <p className="text-white/25 text-xs text-center">
                  Відповідаємо протягом 2 годин у робочий час
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
