import Link from 'next/link'
import { Check, Shield, Clock, TrendingUp, MessageSquare, Star, ArrowRight, Zap, Lock } from 'lucide-react'
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
    patient: 'У мене запис на п'ятницю о 15:00. Можна перенести на наступний тиждень?',
    ai: 'Звісно! Скасовую п'ятницю о 15:00. На наступному тижні є вівторок о 11:00 або середа о 16:30. Що підходить?',
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
            <Link href="/login" className="text-white/60 hover:text-white text-sm transition-colors">Увійти</Link>
            <Link
              href="/register"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Замовити демо
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
                AI-адміністратор для стоматологічних клінік
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] mb-6">
                Поки ваша клініка<br />
                закрита — пацієнти<br />
                <span className="text-indigo-400">йдуть до конкурентів</span>
              </h1>

              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
                DentAI відповідає пацієнтам на сайті, в Instagram, Telegram і WhatsApp
                цілодобово — і автоматично записує їх на прийом.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors text-base"
                >
                  Отримати безкоштовне демо
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#demo"
                  className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-6 py-3.5 rounded-xl font-medium transition-colors text-base"
                >
                  Подивитись як працює ↓
                </a>
              </div>

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
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
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
                icon: '🌙',
                title: 'Після 19:00',
                body: 'Пацієнт написав у Instagram о 21:00. Адміністратор побачить повідомлення завтра зранку. До того часу він вже записався до іншої клініки.',
                label: 'Типова ситуація щовечора',
              },
              {
                icon: '⏳',
                title: 'Повільна відповідь',
                body: 'Навіть вдень адміністратор зайнятий — на ресепшені черга, телефон дзвонить. Повідомлення у Telegram чекає 2–4 години. Пацієнт не чекає.',
                label: 'Щоденна реальність',
              },
              {
                icon: '💸',
                title: 'Ціна запитання',
                body: 'Один пропущений пацієнт — це €50–500 залежно від процедури. 15 пропущених на тиждень = до €7,500 на місяць прямих втрат.',
                label: 'Прямі фінансові втрати',
              },
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

      {/* ── CHANNELS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Один дашборд — всі канали</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Пацієнти пишуть де їм зручно. Ви керуєте всім з одного місця.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CHANNELS.map(({ name, color, bg, letter }, i) => (
              <AnimateOnScroll key={name} delay={i * 60}>
                <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all cursor-default">
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
      <section id="demo" className="py-24" style={{ background: '#0a0e1a' }}>
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
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
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
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
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
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
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
      <section className="py-24 bg-slate-50">
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
                highlight: false,
              },
              {
                name: 'Клініка', price: '€179', period: '/міс',
                desc: 'Найпопулярніший вибір',
                features: ['1 AI-адміністратор', 'Всі 6 каналів', '3000 діалогів/міс', 'Запис + перенос + скасування', 'Аналітика та звіти', 'Підтримка 24/7'],
                highlight: true,
              },
              {
                name: 'Мережа', price: 'від €349', period: '/міс',
                desc: 'Для мереж клінік',
                features: ['До 5 клінік', 'Всі канали', 'Необмежені діалоги', 'Персональний менеджер', 'Кастомні інтеграції', 'SLA'],
                highlight: false,
              },
            ].map(({ name, price, period, desc, features, highlight }, i) => (
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
                    href="/register"
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-colors ${
                      highlight ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    Замовити демо
                  </Link>
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
      <section className="py-24 bg-slate-50">
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
