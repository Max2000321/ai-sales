import Link from 'next/link'
import { Check, Shield, Clock, TrendingUp, MessageSquare, Star, ArrowRight, Zap, Lock, Moon, TrendingDown, MessageCircle, BellOff, Search, UserX, Inbox, CalendarCheck, CheckCircle2, Bot, ListChecks } from 'lucide-react'
import DemoChat from '@/components/landing/DemoChat'
import AnimateOnScroll from '@/components/landing/AnimateOnScroll'
import FaqSection from '@/components/landing/FaqSection'

/* ─── data ──────────────────────────────────────────────────── */

const CHANNELS = [
  { name: 'Instagram', color: '#E1306C', bg: '#fdf2f8', letter: 'In' },
  { name: 'Facebook', color: '#1877F2', bg: '#eff6ff', letter: 'Fb' },
  { name: 'Telegram', color: '#229ED9', bg: '#eff8ff', letter: 'Tg' },
  { name: 'WhatsApp', color: '#25D366', bg: '#f0fdf4', letter: 'Wa' },
  { name: 'Viber', color: '#7360F2', bg: '#f5f3ff', letter: 'Vi' },
  { name: 'Сайт', color: '#4F46E5', bg: '#eef2ff', letter: 'Web' },
]

const PROBLEMS = [
  {
    stat: '73%',
    text: 'пацієнтів обирають клініку, яка відповіла першою',
    sub: 'Дослідження Harvard Medical School, 2023',
  },
  {
    stat: '4+ год',
    text: 'середній час відповіді адміністратора на повідомлення',
    sub: 'За цей час пацієнт вже записався до конкурента',
  },
  {
    stat: '15–20',
    text: 'звернень щотижня губиться після закінчення робочого дня',
    sub: 'Це 60–80 потенційних пацієнтів на місяць',
  },
]

const RESULTS = [
  { icon: TrendingUp, value: '+38%', label: 'більше записів на прийом', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Clock, value: '< 3 сек', label: 'час відповіді пацієнту', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: MessageSquare, value: '0', label: 'пропущених звернень', color: 'text-sky-600', bg: 'bg-sky-50' },
  { icon: Shield, value: '24/7', label: 'без вихідних та свят', color: 'text-violet-600', bg: 'bg-violet-50' },
]

const SCENARIOS = [
  {
    tag: 'Запис на чистку',
    patient: 'Добрий день! Хочу записатись на професійне чищення зубів. Коли найближче є місця?',
    ai: 'Звичайно! Найближчі вільні місця — завтра о 10:00 або в четвер о 14:30. Чищення займає 45 хв, вартість €60. Яке вам зручніше?',
  },
  {
    tag: 'Ціна на імпланти',
    patient: 'Цікавить імплантація. Скільки це коштує у вас?',
    ai: 'Імплант під ключ (з коронкою) у нас від €800. Точна вартість залежить від клінічної ситуації. Запишіться на безкоштовну консультацію — лікар оцінить і назве точну ціну.',
  },
  {
    tag: 'Перенос прийому',
    patient: "У мене запис на п'ятницю о 15:00. Можна перенести на наступний тиждень?",
    ai: "Звісно! Скасовую п'ятницю о 15:00. На наступному тижні є вівторок о 11:00 або середа о 16:30. Що підходить?",
  },
  {
    tag: 'Нічне звернення',
    patient: 'Болить зуб, 23:00. Що робити? Є термінові прийоми?',
    ai: 'Розумію, це неприємно. На завтра є термінове місце о 9:00. Якщо біль дуже сильний — прийміть знеболювальне та зателефонуйте на чергову лінію: +380 XX XXX XXXX.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Олена Коваленко',
    role: 'Власниця клініки',
    clinic: 'Перлина Dental, Київ',
    text: 'За перший місяць отримали 43 додаткових записи, які раніше просто губились після 19:00. Адміністратор нарешті може займатись пацієнтами в залі, а не відповідати на одні й ті ж питання у 5 месенджерах одночасно.',
    initials: 'ОК',
    color: '#4F46E5',
  },
  {
    name: 'Martin Novák',
    role: 'Hlavní lékař',
    clinic: 'DentalCare Praha',
    text: 'Naši recepční zpracovávaly 80+ zpráv denně. Nyní AI zvládá 90 % dotazů automaticky. Obsazenost ordinací vzrostla o 35 % za 6 týdnů. Nejlepší investice za poslední rok.',
    initials: 'MN',
    color: '#0EA5E9',
  },
  {
    name: 'Ірина Петренко',
    role: 'Керівник мережі',
    clinic: 'SmilePlus, 3 клініки, Львів',
    text: 'Спочатку підключили одну клініку. Через тиждень підключили всі три. Пацієнти дивуються, що отримують відповідь о 2 ночі. Конверсія з Instagram зросла вдвічі.',
    initials: 'ІП',
    color: '#10B981',
  },
]

/* ─── page ──────────────────────────────────────────────────── */

export default function LandingPage() {
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
              <span className="hidden sm:inline text-white/40 text-xs ml-2">для стоматологій</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#how" className="hidden md:block text-white/60 hover:text-white text-sm transition-colors">Як це працює</a>
            <a href="#demo" className="hidden md:block text-white/60 hover:text-white text-sm transition-colors">Демо</a>
            {/* Language switcher */}
            <div className="flex items-center border border-white/15 rounded-lg overflow-hidden text-xs font-semibold">
              <span className="px-2.5 py-1.5 bg-white/15 text-white">UA</span>
              <Link href="/en" className="px-2.5 py-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors border-l border-white/10">EN</Link>
              <Link href="/cz" className="px-2.5 py-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors border-l border-white/10">CZ</Link>
            </div>
            <Link href="/login" className="hidden sm:block text-white/60 hover:text-white text-sm transition-colors">Увійти</Link>
            <Link
              href="/register"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
            >
              <span className="sm:hidden">Демо</span>
              <span className="hidden sm:inline">Замовити демо</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-16" style={{ background: 'linear-gradient(160deg, #0a0e1a 0%, #111627 60%, #0f1320 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div>
              <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                AI-адміністратор для стоматологічних клінік
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] mb-6">
                Поки ваша клініка<br />
                закрита — пацієнти<br />
                <span className="text-indigo-400">йдуть до конкурентів</span>
              </h1>

              <p className="text-lg text-white/60 leading-relaxed mb-6 max-w-lg">
                DentAI відповідає пацієнтам на сайті, в Instagram, Telegram і WhatsApp
                цілодобово — і автоматично записує їх на прийом.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Замінює адміністратора', 'Відповідь за 2 секунди', 'Запис 24/7'].map(t => (
                  <span key={t} className="text-xs font-semibold bg-white/8 border border-white/10 text-white/70 px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors text-base"
                >
                  Спробувати 14 днів безкоштовно
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#demo"
                  className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-6 py-3.5 rounded-xl font-medium transition-colors text-base"
                >
                  Подивитись як працює ↓
                </a>
              </div>

              <p className="text-white/35 text-sm mb-8">
                Перші 14 днів безкоштовно · Без прив&apos;язки картки · Скасування будь-коли
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/40">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Налаштування за 24 год</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Без технічних знань</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> GDPR-сумісно</span>
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
                      <p className="text-emerald-400 text-xs">відповідає миттєво</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                      Добрий день! Як можу допомогти? 😊
                    </div>
                    <div className="bg-indigo-600 text-white text-xs px-3 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto">
                      Хочу записатись на чистку. Є місця на цьому тижні?
                    </div>
                    <div className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                      Звичайно! Є четвер о 10:00 або п'ятниця о 14:30. Чищення 45 хв, €60. Що підходить?
                    </div>
                    <div className="bg-indigo-600 text-white text-xs px-3 py-2.5 rounded-2xl rounded-tr-sm max-w-[60%] ml-auto">
                      Четвер о 10:00 👍
                    </div>
                    <div className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                      Чудово! Записала вас. Вкажіть, будь ласка, ваше ім'я та номер телефону.
                    </div>
                  </div>
                  <div className="px-3 py-2 border-t border-white/10 flex items-center gap-2">
                    <div className="flex-1 rounded-lg px-3 py-1.5 text-white/30 text-xs" style={{ background: '#1e2540' }}>
                      Напишіть повідомлення...
                    </div>
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <Send className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <p className="text-center text-white/30 text-xs mt-3">23:47 · відповідь за 2 секунди</p>
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
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Скільки пацієнтів ваша клініка<br className="hidden md:block" /> втрачає щотижня?
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Більшість керівників стоматологій не знають цієї цифри. Але вона є.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Moon, iconColor: 'text-indigo-500', iconBg: 'bg-indigo-50',
                title: 'Після 19:00',
                body: 'Пацієнт написав у Instagram о 21:00. Адміністратор побачить повідомлення завтра зранку. До того часу він вже записався до іншої клініки.',
                label: 'Типова ситуація щовечора',
              },
              {
                Icon: Clock, iconColor: 'text-amber-500', iconBg: 'bg-amber-50',
                title: 'Повільна відповідь',
                body: 'Навіть вдень адміністратор зайнятий — на ресепшені черга, телефон дзвонить. Повідомлення у Telegram чекає 2–4 години. Пацієнт не чекає.',
                label: 'Щоденна реальність',
              },
              {
                Icon: TrendingDown, iconColor: 'text-red-500', iconBg: 'bg-red-50',
                title: 'Ціна запитання',
                body: 'Один пропущений пацієнт — це €50–500 залежно від процедури. 15 пропущених на тиждень = до €7,500 на місяць прямих втрат.',
                label: 'Прямі фінансові втрати',
              },
            ].map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 120}>
                <div className="border border-slate-200 rounded-2xl p-6 h-full bg-white hover:border-slate-300 hover:shadow-md transition-all">
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center mb-5`}>
                    <item.Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">{item.label}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW PATIENTS ARE LOST ── */}
      <section className="py-12 md:py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-8 md:mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ось як ваша клініка втрачає пацієнта
              </h2>
              <p className="text-white/50 text-lg">Це відбувається щовечора. І ви про це не знаєте.</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

              <div className="space-y-0">
                {[
                  { time: '20:47', day: 'Понеділок', Icon: MessageCircle, iconClass: 'text-indigo-400', title: 'Пацієнт пише у WhatsApp', text: '"Добрий вечір! Хочу записатись на чищення зубів. Є місця на цьому тижні?"', status: 'patient' },
                  { time: '20:47', day: 'Понеділок', Icon: BellOff, iconClass: 'text-slate-400', title: 'Адміністратор не відповідає', text: 'Робочий день закінчився о 19:00. Повідомлення залишилось непрочитаним.', status: 'lost' },
                  { time: '20:51', day: 'Понеділок', Icon: Search, iconClass: 'text-amber-400', title: 'Пацієнт шукає іншу клініку', text: 'Через 4 хвилини без відповіді він відкриває Google і знаходить конкурента.', status: 'danger' },
                  { time: '20:55', day: 'Понеділок', Icon: UserX, iconClass: 'text-red-400', title: 'Пацієнт записався до конкурента', text: 'Конкурент відповів за 30 секунд. Пацієнт записаний. Він більше не повернеться до вас.', status: 'lost' },
                  { time: '09:12', day: 'Вівторок', Icon: Inbox, iconClass: 'text-slate-500', title: 'Ваш адміністратор бачить повідомлення', text: 'Запізно. Пацієнт вже у конкурента. Це коштувало вам €60–500.', status: 'late' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 pb-0">
                    <div className="hidden sm:flex flex-col items-center gap-1 w-24 shrink-0 pt-5">
                      <span className="text-white/30 text-xs font-mono">{item.time}</span>
                      <span className="text-white/20 text-xs">{item.day}</span>
                    </div>
                    <div className="hidden sm:flex flex-col items-center shrink-0">
                      <div className={`w-3 h-3 rounded-full mt-6 z-10 shrink-0 ${item.status === 'patient' ? 'bg-indigo-400' : item.status === 'lost' ? 'bg-red-400' : item.status === 'danger' ? 'bg-amber-400' : 'bg-slate-600'}`} />
                    </div>
                    <div className={`flex-1 rounded-2xl p-5 mb-3 border ${item.status === 'lost' ? 'border-red-500/20 bg-red-500/5' : item.status === 'danger' ? 'border-amber-500/20 bg-amber-500/5' : item.status === 'patient' ? 'border-indigo-500/20 bg-indigo-500/5' : 'border-white/5 bg-white/3'}`}>
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mt-0.5">
                          <item.Icon className={`w-4 h-4 ${item.iconClass}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <p className="font-semibold text-white text-sm">{item.title}</p>
                            <span className="sm:hidden text-white/30 text-xs font-mono">{item.time} · {item.day}</span>
                          </div>
                          <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="mt-10 border border-indigo-500/20 bg-indigo-500/8 rounded-2xl p-6 text-center">
              <p className="text-white font-semibold text-lg mb-2">15–20 таких ситуацій щотижня.</p>
              <p className="text-white/50 text-sm">Це €750–10,000 прямих втрат щомісяця — залежно від ваших цін і послуг.</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FLOW ── */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Як це працює з DentAI
              </h2>
              <p className="text-slate-500 text-lg">Той самий пацієнт. Інший результат.</p>
            </div>
          </AnimateOnScroll>

          {/* Flow steps */}
          <AnimateOnScroll delay={100}>
            <div className="relative">
              {/* Desktop connector line */}
              <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-slate-200 z-0" />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-2 relative z-10">
                {[
                  { Icon: MessageCircle, title: 'Пацієнт пише', sub: 'WhatsApp / Instagram / Сайт', time: null, iconColor: 'text-slate-600', bg: 'bg-slate-100', ring: '' },
                  { Icon: Zap, title: 'AI відповідає', sub: 'миттєво, 24/7', time: '2 сек', iconColor: 'text-white', bg: 'bg-indigo-600', ring: 'ring-4 ring-indigo-100' },
                  { Icon: ListChecks, title: 'Уточнює потребу', sub: 'послуга, дата, час', time: '30 сек', iconColor: 'text-indigo-700', bg: 'bg-indigo-100', ring: '' },
                  { Icon: CalendarCheck, title: 'Записує пацієнта', sub: 'обирає зручний слот', time: '1 хв', iconColor: 'text-indigo-700', bg: 'bg-indigo-100', ring: '' },
                  { Icon: CheckCircle2, title: 'Запис підтверджено', sub: 'пацієнт отримує підтвердження', time: null, iconColor: 'text-white', bg: 'bg-emerald-600', ring: '' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-sm ${item.bg} ${item.ring}`}>
                      <item.Icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                    {item.time
                      ? <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mb-2">{item.time}</span>
                      : <div className="h-5 mb-2" />
                    }
                    <p className="font-bold text-slate-900 text-sm mb-1">{item.title}</p>
                    <p className="text-slate-500 text-xs leading-tight">{item.sub}</p>
                    {i < 4 && <div className="lg:hidden text-slate-300 text-xl my-2">↓</div>}
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Без участі адміністратора', Icon: Bot, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Будь-якої миті — навіть о 3 ночі', Icon: Moon, color: 'text-slate-600', bg: 'bg-slate-100' },
                { label: 'Пацієнт записаний, не втрачений', Icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map(({ label, Icon, color, bg }) => (
                <div key={label} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <p className="text-slate-700 font-medium text-sm">{label}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Як це працює</h2>
              <p className="text-slate-500 text-lg">Три кроки — і ваша клініка більше не пропускає жодного звернення</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px bg-slate-200" />
            {[
              { n: '01', title: 'Підключаємо канали', body: 'Instagram, Telegram, WhatsApp, Viber, Facebook та чат на сайті — підключаємо всі за вас. Займає 1 день.' },
              { n: '02', title: 'Навчаємо на даних клініки', body: 'Завантажуєте прайс, розклад, опис послуг. AI навчається відповідати так само, як ваш кращий адміністратор.' },
              { n: '03', title: 'Клініка працює 24/7', body: 'AI відповідає пацієнтам, записує на прийом, переносить візити. Ви бачите всі діалоги в дашборді.' },
            ].map(({ n, title, body }, i) => (
              <AnimateOnScroll key={n} delay={i * 150}>
                <div className="bg-white rounded-2xl p-7 border border-slate-100 relative">
                  <div className="text-5xl font-black text-slate-100 mb-4 leading-none">{n}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD MOCKUP ── */}
      <section className="py-12 md:py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-8 md:mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Один дашборд — всі канали</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Пацієнти пишуть де їм зручно. Ви керуєте всім з одного місця.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            {/* Dashboard shell */}
            <div className="rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
              {/* Top bar */}
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
                  {[
                    { label: 'Діалоги', active: true },
                    { label: 'Аналітика', active: false },
                    { label: 'База знань', active: false },
                    { label: 'Налаштування', active: false },
                  ].map(({ label, active }) => (
                    <div key={label} className={`mx-2 px-3 py-2 rounded-lg text-sm mb-0.5 cursor-default ${active ? 'bg-indigo-600 text-white font-medium' : 'text-slate-500 hover:bg-slate-50'}`}>
                      {label}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-5 min-w-0">
                  {/* Stats row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {[
                      { label: 'Діалогів сьогодні', value: '24', delta: '+6', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                      { label: 'Нових записів', value: '11', delta: '+3', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { label: 'Оброблено AI', value: '22', delta: '92%', color: 'text-sky-600', bg: 'bg-sky-50' },
                      { label: 'Пропущено', value: '0', delta: '—', color: 'text-slate-400', bg: 'bg-slate-100' },
                    ].map(({ label, value, delta, color, bg }) => (
                      <div key={label} className="bg-white rounded-xl border border-slate-100 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-slate-400">{label}</p>
                          <span className={`text-xs font-semibold ${color}`}>{delta}</span>
                        </div>
                        <p className={`text-2xl font-black ${color}`}>{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Dialog list */}
                  <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">Останні діалоги</p>
                      <span className="text-xs text-slate-400">сьогодні, 14:32</span>
                    </div>
                    {[
                      {
                        name: 'Марина К.',
                        preview: 'Хочу записатись на чищення...',
                        time: '14:31',
                        channel: 'In',
                        channelColor: '#E1306C',
                        channelBg: '#fdf2f8',
                        status: 'Записана',
                        statusColor: 'bg-emerald-100 text-emerald-700',
                      },
                      {
                        name: 'Андрій П.',
                        preview: 'Скільки коштує імплант?',
                        time: '14:18',
                        channel: 'Tg',
                        channelColor: '#229ED9',
                        channelBg: '#eff8ff',
                        status: 'Відповідено',
                        statusColor: 'bg-sky-100 text-sky-700',
                      },
                      {
                        name: 'Олена В.',
                        preview: 'Добрий день! Хочу перенести...',
                        time: '13:55',
                        channel: 'Wa',
                        channelColor: '#25D366',
                        channelBg: '#f0fdf4',
                        status: 'Новий',
                        statusColor: 'bg-amber-100 text-amber-700',
                      },
                      {
                        name: 'Дмитро Л.',
                        preview: 'Дякую, все зрозуміло!',
                        time: '13:40',
                        channel: 'In',
                        channelColor: '#E1306C',
                        channelBg: '#fdf2f8',
                        status: 'Записаний',
                        statusColor: 'bg-emerald-100 text-emerald-700',
                      },
                      {
                        name: 'Martin N.',
                        preview: 'Dobrý den, mám dotaz na cenu...',
                        time: '13:12',
                        channel: 'Fb',
                        channelColor: '#1877F2',
                        channelBg: '#eff6ff',
                        status: 'Відповідено',
                        statusColor: 'bg-sky-100 text-sky-700',
                      },
                    ].map(({ name, preview, time, channel, channelColor, channelBg, status, statusColor }) => (
                      <div key={name} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-default">
                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                          {name[0]}
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-slate-800 truncate">{name}</p>
                            <span className="text-xs font-bold rounded px-1.5 py-0.5 shrink-0" style={{ background: channelBg, color: channelColor }}>{channel}</span>
                          </div>
                          <p className="text-xs text-slate-400 truncate">{preview}</p>
                        </div>
                        {/* Right */}
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-xs text-slate-400">{time}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}>{status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">Ваші пацієнти вже там.</p>
                <p className="text-slate-500 text-sm">67% звернень до клінік надходять через месенджери та соцмережі — не через телефон.</p>
              </div>
              <Link href="/register" className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2">
                Підключити клініку <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="py-12 md:py-24" style={{ background: '#0a0e1a' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div>
                <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                  <Zap className="w-3.5 h-3.5" />
                  Спробуйте прямо зараз
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  Живий демо AI-адміністратора
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Це реальний AI — той самий, що ви встановите у своїй клініці.
                  Напишіть йому як пацієнт: запитайте про ціни, попросіть записатись або перенести прийом.
                </p>
                <div className="space-y-3">
                  {['Відповідає за 2–3 секунди', 'Говорить українською, чеською, англійською', 'Пропонує конкретні слоти для запису', 'Ніколи не відмовляє і не грубіянить'].map(t => (
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
              <DemoChat />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── SCENARIOS ── */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Реальні сценарії роботи</h2>
              <p className="text-slate-500 text-lg">Ось що AI робить щодня у вашій клініці</p>
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
                      <div className="bg-indigo-600 text-white text-sm px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%]">
                        {s.patient}
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-slate-100 text-slate-700 text-sm px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%]">
                        {s.ai}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Що отримує ваша клініка</h2>
              <p className="text-slate-500 text-lg">Конкретні результати, не абстрактні обіцянки</p>
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
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Що кажуть клініки</h2>
              <p className="text-slate-500 text-lg">Реальні відгуки власників стоматологій</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 120}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col h-full">
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
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Простий прайс</h2>
              <p className="text-slate-500 text-lg">Адміністратор коштує €1,500–3,000/міс. Ми коштуємо в 10–30 разів менше.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                name: 'Старт', price: '€79', period: '/міс',
                desc: 'Для одиночної клініки',
                features: ['1 AI-адміністратор', '2 канали (сайт + 1 месенджер)', '500 діалогів/міс', 'Запис на прийом', 'Підтримка 9–18'],
                highlight: false, cta: 'Замовити демо', ctaHref: '/register',
              },
              {
                name: 'Клініка', price: '€179', period: '/міс',
                desc: 'Найпопулярніший вибір',
                features: ['1 AI-адміністратор', 'Всі 6 каналів', '3000 діалогів/міс', 'Запис + перенос + скасування', 'Аналітика та звіти', 'Підтримка 24/7'],
                highlight: true, cta: 'Замовити демо', ctaHref: '/register',
              },
              {
                name: 'Мережа', price: 'від €349', period: '/міс',
                desc: 'Для мереж клінік',
                features: ['До 5 клінік', 'Всі канали', 'Необмежені діалоги', 'Персональний менеджер', 'Кастомні інтеграції', 'SLA'],
                highlight: false, cta: "Зв'язатися з нами", ctaHref: '/contact',
              },
            ].map(({ name, price, period, desc, features, highlight, cta, ctaHref }, i) => (
              <AnimateOnScroll key={name} delay={i * 100}>
                <div className={`rounded-2xl p-6 border h-full flex flex-col relative ${highlight ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200'}`}>
                  {highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                      Найпопулярніший
                    </div>
                  )}
                  <div className={`text-sm font-semibold mb-1 ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{name}</div>
                  <div className={`text-xs mb-3 ${highlight ? 'text-indigo-300' : 'text-slate-400'}`}>{desc}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-3xl font-black ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</span>
                    <span className={`text-sm ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {features.map(f => (
                      <li key={f} className={`text-sm flex items-start gap-2 ${highlight ? 'text-indigo-100' : 'text-slate-600'}`}>
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${highlight ? 'text-indigo-300' : 'text-indigo-500'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={ctaHref}
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-colors ${
                      highlight ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {cta}
                  </Link>
                  {ctaHref !== '/contact' && (
                    <p className={`text-center text-xs mt-2.5 ${highlight ? 'text-indigo-300' : 'text-slate-400'}`}>
                      14 днів безкоштовно — без картки
                    </p>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={200}>
            <p className="text-center text-slate-400 text-sm mt-6">
              Не впевнені який план підходить? Зв'яжіться з нами — підберемо разом.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── TRUST / SECURITY ── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Lock, title: 'GDPR-сумісно', body: 'Дані пацієнтів зберігаються на зашифрованих серверах у ЄС. Повна відповідність медичному законодавству України та ЄС.' },
              { icon: Shield, title: 'Безпека даних', body: 'Дані вашої клініки та пацієнтів не передаються третім особам і не використовуються для навчання моделей.' },
              { icon: MessageSquare, title: 'Повний контроль', body: 'Ви завжди бачите всі діалоги. Можете втрутитись, виправити або змінити налаштування у будь-який момент.' },
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
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Часті запитання</h2>
              <p className="text-slate-500">Відповіді на запитання, які задають керівники клінік</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <FaqSection />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24" style={{ background: '#0a0e1a' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Готові зупинити втрати пацієнтів?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Замовте безкоштовне демо<br />для вашої клініки
            </h2>
            <p className="text-white/50 text-lg mb-8">
              15-хвилинний дзвінок. Покажемо як це виглядатиме у вашій клініці,
              підключеній до ваших каналів, з вашими цінами та розкладом.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-base transition-colors"
              >
                Замовити демо безкоштовно
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#demo"
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/60 hover:text-white px-8 py-4 rounded-xl font-medium text-base transition-colors"
              >
                Спробувати демо ↑
              </a>
            </div>
            <p className="text-white/30 text-sm mt-6">
              Без прив'язки картки · Налаштування за 24 години · Скасування будь-коли
            </p>
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
              <p className="text-white/30 text-sm max-w-xs">AI-адміністратор для стоматологічних клінік України та Чехії.</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/40">
              <a href="#how" className="hover:text-white/70 transition-colors">Як це працює</a>
              <a href="#demo" className="hover:text-white/70 transition-colors">Демо</a>
              <Link href="/login" className="hover:text-white/70 transition-colors">Увійти</Link>
              <Link href="/register" className="hover:text-white/70 transition-colors">Замовити демо</Link>
              <a href="mailto:hello@dentai.app" className="hover:text-white/70 transition-colors">hello@dentai.app</a>
              <Link href="/privacy" className="hover:text-white/70 transition-colors">Політика конфіденційності</Link>
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2 text-white/20 text-sm">
            <span>© 2026 DentAI. Всі права захищені.</span>
            <span>Сервери EU · GDPR-сумісно · Медичні дані захищені</span>
          </div>
        </div>
      </footer>

    </div>
  )
}

/* tiny inline icon for hero chat preview */
function Send({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  )
}
