import Link from 'next/link'
import { Check, Shield, Clock, TrendingUp, MessageSquare, Star, ArrowRight, Zap, Lock, Moon, TrendingDown, MessageCircle, BellOff, Search, UserX, Inbox, CalendarCheck, CheckCircle2, Bot, ListChecks } from 'lucide-react'
import DemoChat from '@/components/landing/DemoChat'
import AnimateOnScroll from '@/components/landing/AnimateOnScroll'
import FaqSection from '@/components/landing/FaqSection'

const CHANNELS = [
  { name: 'Instagram', color: '#E1306C', bg: '#fdf2f8', letter: 'In' },
  { name: 'Facebook', color: '#1877F2', bg: '#eff6ff', letter: 'Fb' },
  { name: 'Telegram', color: '#229ED9', bg: '#eff8ff', letter: 'Tg' },
  { name: 'WhatsApp', color: '#25D366', bg: '#f0fdf4', letter: 'Wa' },
  { name: 'Viber', color: '#7360F2', bg: '#f5f3ff', letter: 'Vi' },
  { name: 'Web', color: '#4F46E5', bg: '#eef2ff', letter: 'Web' },
]

const PROBLEMS = [
  { stat: '73 %', text: 'pacientů si vybere ordinaci, která odpoví jako první', sub: 'Výzkum Harvard Medical School, 2023' },
  { stat: '4+ hod', text: 'průměrná doba odpovědi recepční na zprávu', sub: 'Do té doby si pacient objedná ke konkurenci' },
  { stat: '15–20', text: 'dotazů týdně se ztratí po zavírací době', sub: 'To je 60–80 potenciálních pacientů za měsíc' },
]

const RESULTS = [
  { icon: TrendingUp, value: '+38 %', label: 'více objednání za měsíc', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Clock, value: '< 3 s', label: 'doba odpovědi pacientovi', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: MessageSquare, value: '0', label: 'zmeškaných dotazů', color: 'text-sky-600', bg: 'bg-sky-50' },
  { icon: Shield, value: '24/7', label: 'bez dovolených a svátků', color: 'text-violet-600', bg: 'bg-violet-50' },
]

const SCENARIOS = [
  {
    tag: 'Objednání na čištění',
    patient: 'Dobrý den! Chtěl(a) bych se objednat na profesionální čištění zubů. Máte volné termíny tento týden?',
    ai: 'Samozřejmě! Nejbližší volné termíny jsou zítra v 10:00 nebo ve čtvrtek ve 14:30. Čištění trvá 45 minut, cena 1 500 Kč. Který termín vám vyhovuje?',
  },
  {
    tag: 'Cena implantátů',
    patient: 'Zajímám se o zubní implantát. Kolik to u vás stojí?',
    ai: 'Implantát včetně korunky začíná od 20 000 Kč. Přesná cena závisí na klinickém stavu. Objednejte se na bezplatnou konzultaci — lékař posoudí situaci a sdělí vám přesnou cenu.',
  },
  {
    tag: 'Přeobjednání',
    patient: 'Mám termín v pátek ve 15:00. Mohu ho přesunout na příští týden?',
    ai: 'Samozřejmě! Pátek v 15:00 jsem zrušila. Příští týden mám úterý v 11:00 nebo středu ve 16:30. Co vám vyhovuje?',
  },
  {
    tag: 'Noční dotaz',
    patient: 'Bolí mě zub, je 23:00. Co mám dělat? Máte pohotovostní termíny?',
    ai: 'Rozumím, to musí být nepříjemné. Na zítra je k dispozici pohotovostní termín v 9:00. Pokud je bolest velmi silná — vezměte analgetikum a zavolejte na pohotovostní linku: +420 XXX XXX XXX.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Martin Novák',
    role: 'Hlavní lékař',
    clinic: 'DentalCare Praha',
    text: 'Naše recepční zpracovávaly 80+ zpráv denně. Nyní AI zvládá 90 % dotazů automaticky. Obsazenost ordinace vzrostla o 35 % za 6 týdnů. Nejlepší investice za poslední rok.',
    initials: 'MN',
    color: '#0EA5E9',
  },
  {
    name: 'Petra Horáková',
    role: 'Majitelka ordinace',
    clinic: 'Smile Studio Brno',
    text: 'Ztratit pacienta jen proto, že nepřijmeme zprávu po 18. hodině, je frustrující. DentAI to vyřešil okamžitě. Nyní dostávám ráno hotový seznam objednaných pacientů z večera.',
    initials: 'PH',
    color: '#4F46E5',
  },
  {
    name: 'Tomáš Dvořák',
    role: 'Ředitel sítě',
    clinic: 'DentalGroup — 4 ordinace',
    text: 'Nasadili jsme DentAI do všech čtyř ordinací najednou. Integrace s naším rezervačním systémem trvala jeden den. Konverze z Instagramu se zvýšila dvojnásobně.',
    initials: 'TD',
    color: '#10B981',
  },
]

export default function CzPage() {
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
              <span className="hidden sm:inline text-white/40 text-xs ml-2">pro stomatologické ordinace</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#how" className="hidden md:block text-white/60 hover:text-white text-sm transition-colors">Jak to funguje</a>
            <a href="#demo" className="hidden md:block text-white/60 hover:text-white text-sm transition-colors">Demo</a>
            {/* Language switcher */}
            <div className="flex items-center border border-white/15 rounded-lg overflow-hidden text-xs font-semibold">
              <Link href="/" className="px-2.5 py-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors">UA</Link>
              <Link href="/en" className="px-2.5 py-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors border-l border-white/10">EN</Link>
              <span className="px-2.5 py-1.5 bg-white/15 text-white border-l border-white/10">CZ</span>
            </div>
            <Link href="/login" className="text-white/60 hover:text-white text-sm transition-colors">Přihlásit se</Link>
            <Link
              href="/register"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Rezervovat demo
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
                AI administrátor pro stomatologické ordinace
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] mb-6">
                Když je vaše ordinace<br />
                zavřená — pacienti<br />
                <span className="text-indigo-400">jdou ke konkurenci</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-6 max-w-lg">
                DentAI odpovídá pacientům na webu, Instagramu, Telegramu a WhatsApp
                24 hodin denně — a automaticky je objednává na termín.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Nahradí recepční', 'Odpověď za 2 sekundy', 'Objednávání 24/7'].map(t => (
                  <span key={t} className="text-xs font-semibold bg-white/8 border border-white/10 text-white/70 px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors text-base"
                >
                  Získat bezplatné demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#demo"
                  className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-6 py-3.5 rounded-xl font-medium transition-colors text-base"
                >
                  Jak to funguje ↓
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/40">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Spuštění do 24 hodin</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Bez technických znalostí</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> V souladu s GDPR</span>
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
                      <p className="text-emerald-400 text-xs">odpovídá okamžitě</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                      Dobrý den! Jak vám mohu pomoci?
                    </div>
                    <div className="bg-indigo-600 text-white text-xs px-3 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto">
                      Chtěl bych se objednat na čištění zubů. Máte volno tento týden?
                    </div>
                    <div className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                      Samozřejmě! Je čtvrtek v 10:00 nebo pátek ve 14:30. Čištění 45 min, 1 500 Kč. Co vám vyhovuje?
                    </div>
                    <div className="bg-indigo-600 text-white text-xs px-3 py-2.5 rounded-2xl rounded-tr-sm max-w-[60%] ml-auto">
                      Čtvrtek v 10:00
                    </div>
                    <div className="text-white/80 text-xs px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%]" style={{ background: '#1e2540' }}>
                      Skvěle! Termín je zarezervován. Uveďte prosím své jméno a telefon.
                    </div>
                  </div>
                  <div className="px-3 py-2 border-t border-white/10 flex items-center gap-2">
                    <div className="flex-1 rounded-lg px-3 py-1.5 text-white/30 text-xs" style={{ background: '#1e2540' }}>
                      Napište zprávu...
                    </div>
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <SendIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <p className="text-center text-white/30 text-xs mt-3">23:47 · odpověď za 2 sekundy</p>
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
                Kolik pacientů vaše ordinace<br className="hidden md:block" /> každý týden ztrácí?
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Většina majitelů stomatologií toto číslo nezná. Přitom existuje.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Moon, iconColor: 'text-indigo-500', iconBg: 'bg-indigo-50',
                title: 'Po 18. hodině',
                body: 'Pacient napsal na Instagram v 21:00. Recepční to uvidí až ráno. Do té doby se objednala ke konkurenci, která odepsala za 30 sekund.',
                label: 'Typická situace každý večer',
              },
              {
                Icon: Clock, iconColor: 'text-amber-500', iconBg: 'bg-amber-50',
                title: 'Pomalá odpověď',
                body: 'I přes den je recepční zaneprázdněna — v čekárně fronta, telefon zvoní. Zpráva na Telegramu čeká 2–4 hodiny. Pacient nečeká.',
                label: 'Každodenní realita',
              },
              {
                Icon: TrendingDown, iconColor: 'text-red-500', iconBg: 'bg-red-50',
                title: 'Cena jednoho dotazu',
                body: 'Jeden ztracený pacient je 1 500–15 000 Kč podle procedury. 15 ztracených týdně = až 225 000 Kč přímých ztrát měsíčně.',
                label: 'Přímé finanční ztráty',
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
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Jak vaše ordinace ztrácí pacienta
              </h2>
              <p className="text-white/50 text-lg">Stává se to každý večer. A vy o tom nevíte.</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />
              <div className="space-y-0">
                {[
                  { time: '20:47', day: 'Pondělí', Icon: MessageCircle, iconClass: 'text-indigo-400', title: 'Pacient píše na WhatsApp', text: '"Dobrý večer! Chtěl bych se objednat na čištění zubů. Máte volno tento týden?"', status: 'patient' },
                  { time: '20:47', day: 'Pondělí', Icon: BellOff, iconClass: 'text-slate-400', title: 'Recepční neodpovídá', text: 'Pracovní doba skončila v 18:00. Zpráva zůstala nepřečtena.', status: 'lost' },
                  { time: '20:51', day: 'Pondělí', Icon: Search, iconClass: 'text-amber-400', title: 'Pacient hledá jinou ordinaci', text: 'Po 4 minutách bez odpovědi otevírá Google a najde konkurenci.', status: 'danger' },
                  { time: '20:55', day: 'Pondělí', Icon: UserX, iconClass: 'text-red-400', title: 'Pacient se objednal ke konkurenci', text: 'Konkurence odepsala za 30 sekund. Pacient je objednán. Už se k vám nevrátí.', status: 'lost' },
                  { time: '09:12', day: 'Úterý', Icon: Inbox, iconClass: 'text-slate-500', title: 'Vaše recepční vidí zprávu', text: 'Příliš pozdě. Pacient je u konkurence. Přišlo vás to na 1 500–15 000 Kč.', status: 'late' },
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
              <p className="text-white font-semibold text-lg mb-2">15–20 takových situací týdně.</p>
              <p className="text-white/50 text-sm">To je 22 500–225 000 Kč přímých ztrát měsíčně — podle vašich cen a výkonů.</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FLOW ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Jak to funguje s DentAI</h2>
              <p className="text-slate-500 text-lg">Stejný pacient. Jiný výsledek.</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div className="relative">
              <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-slate-200 z-0" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-2 relative z-10">
                {[
                  { Icon: MessageCircle, title: 'Pacient píše', sub: 'WhatsApp / Instagram / Web', time: null, iconColor: 'text-slate-600', bg: 'bg-slate-100', ring: '' },
                  { Icon: Zap, title: 'AI odpovídá', sub: 'okamžitě, 24/7', time: '2 s', iconColor: 'text-white', bg: 'bg-indigo-600', ring: 'ring-4 ring-indigo-100' },
                  { Icon: ListChecks, title: 'Upřesní potřebu', sub: 'výkon, datum, čas', time: '30 s', iconColor: 'text-indigo-700', bg: 'bg-indigo-100', ring: '' },
                  { Icon: CalendarCheck, title: 'Objedná pacienta', sub: 'vybere vhodný termín', time: '1 min', iconColor: 'text-indigo-700', bg: 'bg-indigo-100', ring: '' },
                  { Icon: CheckCircle2, title: 'Termín potvrzen', sub: 'pacient dostane potvrzení', time: null, iconColor: 'text-white', bg: 'bg-emerald-600', ring: '' },
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
                { label: 'Bez zapojení recepční', Icon: Bot, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Kdykoli — i ve 3 v noci', Icon: Moon, color: 'text-slate-600', bg: 'bg-slate-100' },
                { label: 'Pacient objednán, ne ztracen', Icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
      <section id="how" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Jak to funguje</h2>
              <p className="text-slate-500 text-lg">Tři kroky a vaše ordinace nezmeškáte žádný dotaz</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px bg-slate-200" />
            {[
              { n: '01', title: 'Připojíme kanály', body: 'Instagram, Telegram, WhatsApp, Viber, Facebook a chat na webu — vše připojíme za vás. Trvá to 1 den.' },
              { n: '02', title: 'Natrénujeme na datech ordinace', body: 'Nahrajete ceník, rozvrh a popis služeb. AI se naučí odpovídat jako vaše nejlepší recepční.' },
              { n: '03', title: 'Ordinace funguje 24/7', body: 'AI odpovídá pacientům, objednává na termíny, přeobjednává. Všechny dialogy vidíte v přehledu.' },
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Jeden přehled — všechny kanály</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Pacienti píší tam, kde jim to vyhovuje. Vy spravujete vše z jednoho místa.
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
                <p className="font-semibold text-slate-900">Vaši pacienti jsou tam.</p>
                <p className="text-slate-500 text-sm">67 % dotazů do ordinací přichází přes messengery a sociální sítě — ne telefonem.</p>
              </div>
              <Link href="/register" className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2">
                Připojit ordinaci <ArrowRight className="w-4 h-4" />
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
                  Vyzkoušejte hned teď
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  Živé demo AI administrátora
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Toto je skutečné AI — stejné, které nainstalujete ve své ordinaci.
                  Napište mu jako pacient: zeptejte se na ceny, objednejte se nebo přesuňte termín.
                </p>
                <div className="space-y-3">
                  {['Odpovídá za 2–3 sekundy', 'Mluví česky, ukrajinsky, anglicky', 'Nabízí konkrétní termíny', 'Nikdy neodmítne a je vždy zdvořilé'].map(t => (
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
              <DemoChat lang="cz" />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── SCENARIOS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Reálné scénáře</h2>
              <p className="text-slate-500 text-lg">Co AI dělá každý den ve vaší ordinaci</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Co vaše ordinace získá</h2>
              <p className="text-slate-500 text-lg">Konkrétní výsledky, ne abstraktní sliby</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Co říkají ordinace</h2>
              <p className="text-slate-500 text-lg">Skutečné reference od majitelů stomatologií</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 120}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-5">&ldquo;{t.text}&rdquo;</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Přehledný ceník</h2>
              <p className="text-slate-500 text-lg">Recepční stojí 35 000–60 000 Kč/měsíc. My stojíme 10–30× méně.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                name: 'Start', price: '€79', period: '/měs',
                desc: 'Pro jednu ordinaci',
                features: ['1 AI administrátor', '2 kanály (web + 1 messenger)', '500 dialogů/měs', 'Objednávání na termíny', 'Podpora 9–18'],
                highlight: false, cta: 'Rezervovat demo', ctaHref: '/register',
              },
              {
                name: 'Ordinace', price: '€179', period: '/měs',
                desc: 'Nejoblíbenější volba',
                features: ['1 AI administrátor', 'Všechny 4 kanály', '3 000 dialogů/měs', 'Objednání + přeobjednání + zrušení', 'Analytika a reporty', 'Podpora 24/7'],
                highlight: true, cta: 'Rezervovat demo', ctaHref: '/register',
              },
              {
                name: 'Síť', price: 'od €349', period: '/měs',
                desc: 'Pro sítě ordinací',
                features: ['Až 5 ordinací', 'Všechny kanály', 'Neomezené dialogy', 'Osobní manažer', 'Vlastní integrace', 'SLA'],
                highlight: false, cta: 'Kontaktovat nás', ctaHref: '/contact',
              },
            ].map(({ name, price, period, desc, features, highlight, cta, ctaHref }, i) => (
              <AnimateOnScroll key={name} delay={i * 100}>
                <div className={`rounded-2xl p-6 border h-full flex flex-col relative ${highlight ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200'}`}>
                  {highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                      Nejoblíbenější
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
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={200}>
            <p className="text-center text-slate-400 text-sm mt-6">
              Nejste si jistí, který plán je pro vás? Kontaktujte nás — vybereme společně.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── TRUST / SECURITY ── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Lock, title: 'V souladu s GDPR', body: 'Data pacientů jsou uložena na šifrovaných serverech v EU. Plný soulad s legislativou o zdravotní dokumentaci v ČR i EU.' },
              { icon: Shield, title: 'Bezpečnost dat', body: 'Data vaší ordinace a pacientů nejsou nikdy sdílena s třetími stranami ani používána k trénování modelů.' },
              { icon: MessageSquare, title: 'Plná kontrola', body: 'Vždy vidíte všechny dialogy. Můžete kdykoli zasáhnout, opravit nebo změnit nastavení.' },
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
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Časté otázky</h2>
              <p className="text-slate-500">Odpovědi na otázky, které kladou majitelé ordinací</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <FaqSection lang="cz" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24" style={{ background: '#0a0e1a' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Připraveni zastavit ztráty pacientů?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Objednejte bezplatné demo<br />pro vaši ordinaci
            </h2>
            <p className="text-white/50 text-lg mb-8">
              15minutový hovor. Ukážeme, jak to bude vypadat ve vaší ordinaci —
              s vašimi kanály, vašimi cenami a rozvrhem.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-base transition-colors"
              >
                Objednat demo zdarma
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#demo"
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/60 hover:text-white px-8 py-4 rounded-xl font-medium text-base transition-colors"
              >
                Vyzkoušet demo ↑
              </a>
            </div>
            <p className="text-white/30 text-sm mt-6">
              Bez vazby na kartu · Spuštění do 24 hodin · Zrušení kdykoli
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
              <p className="text-white/30 text-sm max-w-xs">AI administrátor pro stomatologické ordinace na Ukrajině a v České republice.</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/40">
              <a href="#how" className="hover:text-white/70 transition-colors">Jak to funguje</a>
              <a href="#demo" className="hover:text-white/70 transition-colors">Demo</a>
              <Link href="/login" className="hover:text-white/70 transition-colors">Přihlásit se</Link>
              <Link href="/register" className="hover:text-white/70 transition-colors">Rezervovat demo</Link>
              <a href="mailto:hello@dentai.app" className="hover:text-white/70 transition-colors">hello@dentai.app</a>
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2 text-white/20 text-sm">
            <span>© 2026 DentAI. Všechna práva vyhrazena.</span>
            <span>Servery EU · GDPR · Zdravotní data chráněna</span>
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
