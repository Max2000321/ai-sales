'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Bot, BookOpen, Rocket, Check, Loader2, Copy, ExternalLink, Sparkles } from 'lucide-react'

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

type Lang = 'uk' | 'en' | 'cz'

const T = {
  uk: {
    steps: ['Створити агента', 'База знань', 'Запуск'],
    step1: {
      title: 'Створіть вашого першого агента',
      sub: "Дайте йому ім'я та оберіть колір. Займе 30 секунд.",
      nameLabel: "Назва агента",
      namePlaceholder: 'напр. Ivory Dental, SmilePlus...',
      colorLabel: 'Колір віджету',
      previewLabel: 'Попередній перегляд',
      onlineLabel: 'Онлайн',
      btn: 'Продовжити →',
    },
    step2: {
      title: 'Додайте базу знань',
      sub: 'Вставте FAQ, інформацію про послуги або ціни. AI відповідатиме на основі цих даних.',
      placeholder: `Приклад:\n\nQ: Скільки коштує чищення зубів?\nA: Професійне чищення €60, займає 45 хвилин.\n\nQ: Як записатись на прийом?\nA: Напишіть тут або зателефонуйте нам. Найближчі слоти — завтра о 10:00 та 14:30.\n\nQ: Чи є безкоштовна консультація?\nA: Так, перша консультація безкоштовна.`,
      btnSave: 'Зберегти та продовжити →',
      btnSkip: 'Пропустити →',
    },
    step3: {
      title: 'Агента запущено!',
      sub: 'Поділіться посиланням або додайте віджет на сайт клініки.',
      shareLinkLabel: 'Посилання для пацієнтів',
      copyBtn: 'Копіювати',
      copiedBtn: 'Скопійовано!',
      testBtn: 'Протестувати агента',
      dashBtn: 'Перейти до дашборду →',
      skipWarning: "Ви пропустили базу знань — додайте її пізніше в розділі «База знань» для кращих відповідей.",
    },
    skipSetup: 'Пропустити налаштування — перейти до дашборду',
  },
  en: {
    steps: ['Create agent', 'Add knowledge', 'Go live'],
    step1: {
      title: 'Create your first agent',
      sub: 'Give it a name and pick a color. Takes 30 seconds.',
      nameLabel: 'Agent name',
      namePlaceholder: 'e.g. Ivory Dental, SmilePlus...',
      colorLabel: 'Widget color',
      previewLabel: 'Preview',
      onlineLabel: 'Online',
      btn: 'Continue →',
    },
    step2: {
      title: 'Add your knowledge base',
      sub: 'Paste your FAQ, service info or pricing. The AI will use this to answer patients.',
      placeholder: `Example:\n\nQ: How much is teeth cleaning?\nA: Professional cleaning is €60, takes 45 minutes.\n\nQ: How do I book an appointment?\nA: Write here or call us. Nearest slots — tomorrow at 10:00 and 14:30.\n\nQ: Is the consultation free?\nA: Yes, the first consultation is free.`,
      btnSave: 'Save & continue →',
      btnSkip: 'Skip for now →',
    },
    step3: {
      title: 'Your agent is live!',
      sub: 'Share the link or embed it on your clinic website.',
      shareLinkLabel: 'Share link',
      copyBtn: 'Copy',
      copiedBtn: 'Copied!',
      testBtn: 'Test your agent',
      dashBtn: 'Go to Dashboard →',
      skipWarning: 'You skipped the knowledge base — add it later in the Knowledge section for better answers.',
    },
    skipSetup: 'Skip setup — go to dashboard',
  },
  cz: {
    steps: ['Vytvořit agenta', 'Znalostní báze', 'Spustit'],
    step1: {
      title: 'Vytvořte svého prvního agenta',
      sub: 'Dejte mu jméno a vyberte barvu. Trvá to 30 sekund.',
      nameLabel: 'Název agenta',
      namePlaceholder: 'např. Ivory Dental, DentalCare Praha...',
      colorLabel: 'Barva widgetu',
      previewLabel: 'Náhled',
      onlineLabel: 'Online',
      btn: 'Pokračovat →',
    },
    step2: {
      title: 'Přidejte znalostní bázi',
      sub: 'Vložte FAQ, informace o službách nebo ceník. AI bude odpovídat na základě těchto dat.',
      placeholder: `Příklad:\n\nQ: Kolik stojí čištění zubů?\nA: Profesionální čištění 1 500 Kč, trvá 45 minut.\n\nQ: Jak se objednat na termín?\nA: Napište zde nebo nám zavolejte. Nejbližší termíny — zítra v 10:00 a 14:30.\n\nQ: Je konzultace zdarma?\nA: Ano, první konzultace je zdarma.`,
      btnSave: 'Uložit a pokračovat →',
      btnSkip: 'Přeskočit →',
    },
    step3: {
      title: 'Agent je spuštěn!',
      sub: 'Sdílejte odkaz nebo přidejte widget na web ordinace.',
      shareLinkLabel: 'Odkaz pro pacienty',
      copyBtn: 'Kopírovat',
      copiedBtn: 'Zkopírováno!',
      testBtn: 'Otestovat agenta',
      dashBtn: 'Přejít na přehled →',
      skipWarning: 'Přeskočili jste znalostní bázi — přidejte ji později v sekci Znalostní báze pro lepší odpovědi.',
    },
    skipSetup: 'Přeskočit nastavení — přejít na přehled',
  },
}

export default function OnboardingWizard() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('uk')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const [agentName, setAgentName] = useState('')
  const [agentColor, setAgentColor] = useState('#6366f1')
  const [agentId, setAgentId] = useState<string | null>(null)
  const [faqText, setFaqText] = useState('')
  const [skippedKnowledge, setSkippedKnowledge] = useState(false)

  const t = T[lang]
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ai-sales-iota-three.vercel.app'
  const chatUrl = agentId ? `${appUrl}/chat/${agentId}` : ''

  const STEPS = [
    { id: 1, icon: Bot },
    { id: 2, icon: BookOpen },
    { id: 3, icon: Rocket },
  ]

  async function createAgent() {
    if (!agentName.trim()) return
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from('agents').insert({
      user_id: user!.id,
      name: agentName,
      description: '',
      system_prompt: `Ты — профессиональный, заботливый и квалифицированный AI-администратор стоматологической клиники «${agentName}». Твоя цель — помогать пациентам: отвечать на вопросы по услугам, ценам и графику и помогать подобрать удобное время для визита.

ЯЗЫК: всегда отвечай на том языке, на котором пишет пациент (украинский → украинский, русский → русский, чешский → чешский, английский → английский).

1. ОСТРАЯ БОЛЬ (ТРИАЖ): если пациент жалуется на острую боль, сильный отёк, кровотечение или травму зуба — НЕ предлагай обычную запись. Сообщи: «Если это острая боль, мы примем вас без очереди сегодня» и предложи ближайшее свободное время. Отметь обращение как срочное и сообщи пациенту, что передаёшь его администратору для немедленной связи.

2. МЕДИЦИНСКИЕ ОГРАНИЧЕНИЯ: тебе категорически запрещено ставить диагнозы, назначать лекарства (антибиотики, обезболивающие) и комментировать чужое лечение. На вопросы «что выпить?» или «что это может быть?» отвечай строго: «Я — виртуальный ассистент и не могу назначать лечение. Чтобы помочь вам безопасно, необходим осмотр врача. Давайте я подберу удобное время для визита?»

3. ЗАПИСЬ НА ПРИЁМ (ВАЖНО): ты НЕ вносишь запись в систему самостоятельно. Ты помогаешь подобрать удобное время и передаёшь данные администратору для подтверждения. Никогда не говори, что приём окончательно записан — говори «передам администратору, он подтвердит вашу запись». Ориентиры длительности, если иное не указано в базе знаний: первичная консультация — 30 минут; лечение кариеса / установка пломбы — 1 час. Соблюдай возрастные ограничения врачей, если они указаны в базе.

4. ОТМЕНЫ И ПРЕДОПЛАТЫ: предупреждай, что отмена или перенос визита возможны не позднее чем за 24 часа до приёма. Для дорогостоящих процедур (имплантация, брекеты) вежливо сообщай о возможной частичной предоплате, если это указано в базе знаний.

5. ТОН И СТИЛЬ: общайся вежливо, эмпатично, но лаконично. Не используй сложные медицинские термины, если пациент о них не спросил. Пиши короткими абзацами, удобными для чтения в мессенджерах.

Используй информацию о ценах, врачах и услугах ТОЛЬКО из базы знаний. Если ответа на вопрос в базе нет, отвечай: «Я уточню этот вопрос у администратора, и мы свяжемся с вами в ближайшее время». Не выдумывай цены, имена врачей или услуги.`,
      widget_color: agentColor,
    }).select('id').single()
    setAgentId(data?.id || null)
    setLoading(false)
    setStep(2)
  }

  async function saveKnowledge() {
    if (!faqText.trim() || !agentId) {
      setSkippedKnowledge(true)
      setStep(3)
      return
    }
    setLoading(true)
    await fetch('/api/knowledge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId, text: faqText, sourceName: 'FAQ' }),
    })
    setLoading(false)
    setStep(3)
  }

  async function copyLink() {
    await navigator.clipboard.writeText(chatUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">

      {/* Language switcher */}
      <div className="w-full max-w-lg flex justify-end mb-3">
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs font-semibold bg-white">
          {(['uk', 'en', 'cz'] as Lang[]).map((l, i) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 transition-colors ${l === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-700'} ${i > 0 ? 'border-l border-slate-200' : ''}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  step > s.id ? 'bg-indigo-600 text-white'
                  : step === s.id ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                  : 'bg-white border-2 border-slate-200 text-slate-400'
                }`}>
                  {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-medium ${step >= s.id ? 'text-indigo-700' : 'text-slate-400'}`}>
                  {t.steps[i]}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 ${step > s.id ? 'bg-indigo-600' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.step1.title}</h1>
              <p className="text-slate-500 text-sm">{t.step1.sub}</p>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.step1.nameLabel}</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={e => setAgentName(e.target.value)}
                  placeholder={t.step1.namePlaceholder}
                  autoFocus
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.step1.colorLabel}</label>
                <div className="flex gap-3">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setAgentColor(c)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${agentColor === c ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {agentName && (
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50">
                  <p className="text-xs text-slate-400 mb-2 font-medium">{t.step1.previewLabel}</p>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl w-fit" style={{ backgroundColor: agentColor }}>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">{agentName}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <span className="text-white/80 text-xs">{t.step1.onlineLabel}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={createAgent}
                disabled={loading || !agentName.trim()}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {t.step1.btn}
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.step2.title}</h1>
              <p className="text-slate-500 text-sm">{t.step2.sub}</p>
            </div>
            <div className="space-y-4">
              <textarea
                value={faqText}
                onChange={e => setFaqText(e.target.value)}
                placeholder={t.step2.placeholder}
                rows={8}
                autoFocus
                className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
              <button
                onClick={saveKnowledge}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {faqText.trim() ? t.step2.btnSave : t.step2.btnSkip}
              </button>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.step3.title}</h1>
              <p className="text-slate-500 text-sm">{t.step3.sub}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">{t.step3.shareLinkLabel}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-700 truncate flex-1 font-mono">{chatUrl}</p>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-1.5 text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? t.step3.copiedBtn : t.step3.copyBtn}
                  </button>
                </div>
              </div>

              <a
                href={chatUrl}
                target="_blank"
                className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {t.step3.testBtn}
              </a>

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                {t.step3.dashBtn}
              </button>

              {skippedKnowledge && (
                <p className="text-xs text-amber-600 text-center bg-amber-50 rounded-lg px-3 py-2">
                  {t.step3.skipWarning}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {step < 3 && (
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          {t.skipSetup}
        </button>
      )}
    </div>
  )
}
