import Link from 'next/link'
import { Check, Shield, Clock, TrendingUp, MessageSquare, Star, ArrowRight, Zap, Lock } from 'lucide-react'
import DemoChat from '@/components/landing/DemoChat'
import AnimateOnScroll from '@/components/landing/AnimateOnScroll'
import FaqSection from '@/components/landing/FaqSection'

const CHANNELS = [
  { name: 'Instagram', color: '#E1306C', bg: '#fdf2f8', letter: 'In' },
  { name: 'Facebook', color: '#1877F2', bg: '#eff6ff', letter: 'Fb' },
  { name: 'Telegram', color: '#229ED9', bg: '#eff8ff', letter: 'Tg' },
  { name: 'WhatsApp', color: '#25D366', bg: '#f0fdf4', letter: 'Wa' },
  { name: 'Viber', color: '#7360F2', bg: '#f5f3ff', letter: 'Vi' },
  { name: 'Website', color: '#4F46E5', bg: '#eef2ff', letter: 'Web' },
]

const PROBLEMS = [
  { stat: '73%', text: 'of patients choose the clinic that responds first', sub: 'Harvard Medical School research, 2023' },
  { stat: '4+ hrs', text: 'average response time from a human administrator', sub: 'By then, the patient has already booked elsewhere' },
  { stat: '15–20', text: 'inquiries lost per clinic per week after closing time', sub: 'That is 60–80 potential patients per month' },
]

const RESULTS = [
  { icon: TrendingUp, value: '+38%', label: 'more appointments per month', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Clock, value: '< 3 sec', label: 'response time to patients', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: MessageSquare, value: '0', label: 'missed patient inquiries', color: 'text-sky-600', bg: 'bg-sky-50' },
  { icon: Shield, value: '24/7', label: 'no holidays, no sick days', color: 'text-violet-600', bg: 'bg-violet-50' },
]

const SCENARIOS = [
  {
    tag: 'Book a cleaning',
    patient: 'Hello! I would like to book a professional teeth cleaning. What slots do you have this week?',
    ai: 'Of course! The nearest available slots are tomorrow at 10:00 or Thursday at 14:30. Cleaning takes 45 min, €60. Which works better for you?',
  },
  {
    tag: 'Implant pricing',
    patient: "I'm interested in a dental implant. How much does it cost?",
    ai: 'An implant including crown starts from €800. The exact price depends on your clinical situation. Book a free consultation — the dentist will assess and give you a precise quote.',
  },
  {
    tag: 'Reschedule appointment',
    patient: "I have an appointment on Friday at 3 PM. Can I move it to next week?",
    ai: "Of course! I've cancelled Friday at 3 PM. Next week we have Tuesday at 11:00 or Wednesday at 16:30. Which suits you?",
  },
  {
    tag: 'Late-night inquiry',
    patient: 'Toothache, it\'s 11 PM. What should I do? Do you have emergency appointments?',
    ai: "I understand, that's very unpleasant. There's an urgent slot available tomorrow at 9:00. If the pain is severe — take a painkiller and call our emergency line: +XX XXX XXX XXX.",
  },
]

const TESTIMONIALS = [
  {
    name: 'Olena Kovalenko',
    role: 'Clinic Owner',
    clinic: 'Perlyna Dental, Kyiv',
    text: 'In the first month we received 43 additional bookings that previously just disappeared after 7 PM. Our receptionist can finally focus on patients at the front desk instead of answering the same questions across 5 messengers simultaneously.',
    initials: 'OK',
    color: '#4F46E5',
  },
  {
    name: 'Martin Novák',
    role: 'Head Dentist',
    clinic: 'DentalCare Praha, Prague',
    text: 'Our receptionists were handling 80+ messages a day. Now the AI handles 90% of inquiries automatically. Appointment occupancy increased by 35% in 6 weeks. Best investment of the year.',
    initials: 'MN',
    color: '#0EA5E9',
  },
  {
    name: 'Iryna Petrenko',
    role: 'Network Director',
    clinic: 'SmilePlus — 3 clinics, Lviv',
    text: 'We started with one clinic. Within a week we connected all three. Patients are amazed to get a reply at 2 AM. Our Instagram conversion doubled in the first month.',
    initials: 'IP',
    color: '#10B981',
  },
]

export default function EnPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md" style={{ background: 'rgba(10,14,26,0.92)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div>
              <span className="text-white font-bold text-base">DentAI</span>
              <span className="hidden sm:inline text-white/40 text-xs ml-2">for dental clinics</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#how" className="hidden md:block text-white/60 hover:text-white text-sm transition-colors">How it works</a>
            <a href="#demo" className="hidden md:block text-white/60 hover:text-white text-sm transition-colors">Demo</a>
            {/* Language switcher */}
            <div className="flex items-center border border-white/15 rounded-lg overflow-hidden text-xs font-semibold">
              <Link href="/" className="px-2.5 py-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors">UA</Link>
              <span className="px-2.5 py-1.5 bg-white/15 text-white">EN</span>
            </div>
            <Link href="/login" className="text-white/60 hover:text-white text-sm transition-colors">Sign in</Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Book a demo
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-16" style={{ background: 'linear-gradient(160deg, #0a0e1a 0%, #111627 60%, #0f1320 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                AI Administrator for Dental Clinics
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] mb-6">
                While your clinic is closed —<br />
                <span className="text-indigo-400">patients book with competitors</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
                DentAI responds to patients on your website, Instagram, Telegram and WhatsApp 24/7 — and automatically books appointments.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href="/register" className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors text-base">
                  Get a free demo <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#demo" className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-6 py-3.5 rounded-xl font-medium transition-colors text-base">
                  See how it works ↓
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/40">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Live in 24 hours</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> No technical skills needed</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> GDPR-compliant</span>
              </div>
            </div>

            {/* Hero chat preview */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-xs">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ background: '#141827' }}>
                  <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">ID</div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#141827]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs">Ivory Dental</p>
                      <p className="text-emerald-400 text-xs">replies instantly</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                      Hello! How can I help you today? 😊
                    </div>
                    <div className="bg-indigo-600 text-white text-xs px-3 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto">
                      I'd like to book a cleaning. Any slots this week?
                    </div>
                    <div className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                      Sure! Thursday at 10:00 or Friday at 14:30. Cleaning is 45 min, €60. Which works?
                    </div>
                    <div className="bg-indigo-600 text-white text-xs px-3 py-2.5 rounded-2xl rounded-tr-sm max-w-[60%] ml-auto">
                      Thursday at 10 👍
                    </div>
                    <div className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                      Done! Please share your name and phone number to confirm.
                    </div>
                  </div>
                  <div className="px-3 py-2 border-t border-white/10 flex items-center gap-2">
                    <div className="flex-1 rounded-lg px-3 py-1.5 text-white/30 text-xs" style={{ background: '#1e2540' }}>Write a message...</div>
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <SendIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <p className="text-center text-white/30 text-xs mt-3">11:47 PM · response in 2 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-indigo-600 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-indigo-500">
            {PROBLEMS.map(({ stat, text, sub }) => (
              <div key={stat} className="text-center md:px-8">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat}</p>
                <p className="text-indigo-100 text-sm font-medium mb-0.5">{text}</p>
                <p className="text-indigo-300 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How many patients did your clinic lose last week?</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Most dental clinic owners don't know this number. But it exists.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌙', title: 'After 7 PM', label: 'Every evening', body: 'A patient messaged your Instagram at 9 PM. Your receptionist will see it tomorrow morning. By then they have already booked with another clinic.' },
              { icon: '⏳', title: 'Slow response', label: 'Daily reality', body: "Even during the day, your receptionist is busy — people waiting, phone ringing. That Telegram message waits 2–4 hours. The patient doesn't wait." },
              { icon: '💸', title: 'The real cost', label: 'Direct financial loss', body: 'One missed patient = €50–500 depending on the procedure. 15 missed per week = up to €7,500 in direct losses per month.' },
            ].map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 120}>
                <div className="border border-slate-200 rounded-2xl p-6 h-full bg-white hover:border-slate-300 hover:shadow-md transition-all">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">{item.label}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How it works</h2>
              <p className="text-slate-500 text-lg">Three steps — and your clinic never misses an inquiry again</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Connect your channels', body: 'Instagram, Telegram, WhatsApp, Viber, Facebook and your website chat — we connect everything for you. Takes 1 day.' },
              { n: '02', title: 'Train on your clinic data', body: 'Upload your price list, schedule and service descriptions. The AI learns to respond exactly like your best receptionist.' },
              { n: '03', title: 'Your clinic works 24/7', body: 'The AI responds to patients, books appointments, reschedules visits. You see all conversations in your dashboard.' },
            ].map(({ n, title, body }, i) => (
              <AnimateOnScroll key={n} delay={i * 150}>
                <div className="bg-white rounded-2xl p-7 border border-slate-100">
                  <div className="text-5xl font-black text-slate-100 mb-4 leading-none">{n}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHANNELS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">One dashboard — all channels</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Patients write where it's convenient for them. You manage everything from one place.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CHANNELS.map(({ name, color, bg, letter }, i) => (
              <AnimateOnScroll key={name} delay={i * 60}>
                <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: bg, color }}>
                    {letter}
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{name}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={200}>
            <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">Your patients are already there.</p>
                <p className="text-slate-500 text-sm">67% of dental clinic inquiries come through messengers and social media — not the phone.</p>
              </div>
              <Link href="/register" className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2">
                Connect your clinic <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="py-24" style={{ background: '#0a0e1a' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div>
                <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                  <Zap className="w-3.5 h-3.5" /> Try it right now
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Live AI administrator demo</h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  This is the real AI — the same one you will install in your clinic. Write to it like a patient: ask about prices, book an appointment or reschedule a visit.
                </p>
                <div className="space-y-3">
                  {['Responds in 2–3 seconds', 'Speaks Ukrainian, Czech, English', 'Suggests specific available slots', 'Never rude, never unavailable'].map(t => (
                    <div key={t} className="flex items-center gap-3 text-white/70 text-sm">
                      <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <DemoChat lang="en" />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── SCENARIOS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Real use cases</h2>
              <p className="text-slate-500 text-lg">What the AI handles every day in your clinic</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SCENARIOS.map((s, i) => (
              <AnimateOnScroll key={s.tag} delay={i * 100}>
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{s.tag}</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-indigo-600 text-white text-sm px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%]">{s.patient}</div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-slate-100 text-slate-700 text-sm px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%]">{s.ai}</div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What your clinic gets</h2>
              <p className="text-slate-500 text-lg">Concrete results, not abstract promises</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {RESULTS.map(({ icon: Icon, value, label, color, bg }, i) => (
              <AnimateOnScroll key={label} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 text-center hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <p className={`text-3xl font-black ${color} mb-2`}>{value}</p>
                  <p className="text-slate-600 text-sm leading-tight">{label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What clinics say</h2>
              <p className="text-slate-500 text-lg">Real feedback from dental clinic owners</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 120}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: t.color }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role} · {t.clinic}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple pricing</h2>
              <p className="text-slate-500 text-lg">A receptionist costs €1,500–3,000/mo. We cost 10–30× less.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              { name: 'Starter', price: '€79', period: '/mo', desc: 'Single clinic', features: ['1 AI administrator', '2 channels (website + 1 messenger)', '500 conversations/mo', 'Appointment booking', 'Support 9–18'], highlight: false },
              { name: 'Clinic', price: '€179', period: '/mo', desc: 'Most popular', features: ['1 AI administrator', 'All 6 channels', '3,000 conversations/mo', 'Book, reschedule & cancel', 'Analytics & reports', '24/7 support'], highlight: true },
              { name: 'Network', price: 'from €349', period: '/mo', desc: 'For clinic networks', features: ['Up to 5 clinics', 'All channels', 'Unlimited conversations', 'Dedicated account manager', 'Custom integrations', 'SLA'], highlight: false },
            ].map(({ name, price, period, desc, features, highlight }, i) => (
              <AnimateOnScroll key={name} delay={i * 100}>
                <div className={`rounded-2xl p-6 border h-full flex flex-col relative ${highlight ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200'}`}>
                  {highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">Most popular</div>}
                  <div className={`text-sm font-semibold mb-1 ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{name}</div>
                  <div className={`text-xs mb-3 ${highlight ? 'text-indigo-300' : 'text-slate-400'}`}>{desc}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-3xl font-black ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</span>
                    <span className={`text-sm ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {features.map(f => (
                      <li key={f} className={`text-sm flex items-start gap-2 ${highlight ? 'text-indigo-100' : 'text-slate-600'}`}>
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${highlight ? 'text-indigo-300' : 'text-indigo-500'}`} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className={`block text-center py-3 rounded-xl text-sm font-semibold transition-colors ${highlight ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                    Book a demo
                  </Link>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Lock, title: 'GDPR-compliant', body: 'Patient data is stored on encrypted EU servers, fully compliant with healthcare regulations in Ukraine and the EU.' },
              { icon: Shield, title: 'Your data is private', body: 'Your clinic data and patient information are never shared with third parties or used to train AI models.' },
              { icon: MessageSquare, title: 'Full control', body: 'You always see all conversations. You can step in, correct or change settings at any moment.' },
            ].map(({ icon: Icon, title, body }) => (
              <AnimateOnScroll key={title}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Frequently asked questions</h2>
              <p className="text-slate-500">Answers to questions dental clinic owners ask us most</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <FaqSection lang="en" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24" style={{ background: '#0a0e1a' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Ready to stop losing patients?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Book a free demo<br />for your clinic
            </h2>
            <p className="text-white/50 text-lg mb-8">
              A 15-minute call. We will show exactly how it looks for your clinic — connected to your channels, with your prices and schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register" className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-base transition-colors">
                Book a free demo <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#demo" className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/60 hover:text-white px-8 py-4 rounded-xl font-medium text-base transition-colors">
                Try the demo ↑
              </a>
            </div>
            <p className="text-white/30 text-sm mt-6">No credit card · Live in 24 hours · Cancel anytime</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-12" style={{ background: '#060910' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">D</span>
                </div>
                <span className="text-white font-bold">DentAI</span>
              </div>
              <p className="text-white/30 text-sm max-w-xs">AI administrator for dental clinics in Ukraine and Czech Republic.</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/40">
              <a href="#how" className="hover:text-white/70 transition-colors">How it works</a>
              <a href="#demo" className="hover:text-white/70 transition-colors">Demo</a>
              <Link href="/" className="hover:text-white/70 transition-colors">🇺🇦 Українська</Link>
              <Link href="/login" className="hover:text-white/70 transition-colors">Sign in</Link>
              <a href="mailto:hello@dentai.app" className="hover:text-white/70 transition-colors">hello@dentai.app</a>
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2 text-white/20 text-sm">
            <span>© 2026 DentAI. All rights reserved.</span>
            <span>EU servers · GDPR-compliant · Medical data protected</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  )
}
