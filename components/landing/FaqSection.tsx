'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = {
  uk: [
    { q: 'Чи відповідає AI українською та чеською мовами?', a: 'Так. AI автоматично визначає мову пацієнта та відповідає нею — українською, чеською, англійською, російською або будь-якою іншою мовою. Ви також можете встановити мову за замовчуванням для своєї клініки.' },
    { q: 'Скільки часу займає налаштування?', a: 'Більшість клінік запускаються протягом 24 годин. Наша команда налаштовує все за вас — ви надаєте інформацію про клініку, послуги та ціни, а ми робимо все інше.' },
    { q: 'Чи може AI реально записати пацієнта на прийом?', a: 'Так. AI інтегрується з вашою системою запису та може самостійно бронювати, переносити або скасовувати прийоми без участі адміністратора.' },
    { q: 'Що відбувається, якщо пацієнт запитує про щось термінове?', a: 'Для екстрених ситуацій AI миттєво надає контактний номер чергового лікаря та адресу клініки. Ви самі налаштовуєте правила ескалації — наприклад, пересилання повідомлень адміністратору або лікарю.' },
    { q: 'Чи відповідає система вимогам GDPR та захисту медичних даних?', a: 'Так. Усі дані пацієнтів зберігаються на зашифрованих серверах у ЄС та обробляються відповідно до GDPR. Ми ніколи не передаємо медичні дані третім особам і не використовуємо їх для навчання моделей.' },
    { q: 'З якими каналами працює система?', a: 'Сайт (чат-віджет), Instagram Direct, Facebook Messenger, Telegram, WhatsApp та Viber — усі керуються з одного дашборду. Пацієнт пише де йому зручно, ви бачите все в одному місці.' },
    { q: 'Чи можу я контролювати, що говорить AI?', a: 'Повністю. Ви завантажуєте базу знань — послуги, ціни, умови, розклад. AI відповідає лише на основі вашої інформації. Якщо він не знає відповіді — ввічливо переадресовує до адміністратора.' },
  ],
  en: [
    { q: 'Does the AI respond in Ukrainian and Czech?', a: 'Yes. The AI automatically detects the patient\'s language and replies in Ukrainian, Czech, English, or any other major language. You can also set a default language for your clinic.' },
    { q: 'How quickly is the setup done?', a: 'Most clinics go live within 24 hours. Our team handles everything — you provide your clinic\'s info, services and prices, and we do the rest.' },
    { q: 'Can the AI actually book appointments?', a: 'Yes. The AI integrates with your booking system and can independently schedule, reschedule or cancel appointments without staff involvement.' },
    { q: 'What happens if a patient has an urgent dental issue?', a: 'For emergencies, the AI immediately provides the on-call dentist number and clinic address. You configure escalation rules — for example, forwarding urgent messages to a staff member.' },
    { q: 'Is the system GDPR-compliant?', a: 'Yes. All patient data is stored on encrypted EU servers and processed in full compliance with GDPR. We never share medical data with third parties or use it for model training.' },
    { q: 'Which channels does it work with?', a: 'Website chat widget, Instagram Direct, Facebook Messenger, Telegram, WhatsApp and Viber — all managed from one dashboard. Patients write wherever they prefer, you see everything in one place.' },
    { q: 'Can I control what the AI says?', a: 'Fully. You upload your knowledge base — services, prices, conditions, schedule. The AI only answers based on your information. If it doesn\'t know something, it politely refers the patient to your staff.' },
  ],
}

interface Props {
  lang?: 'uk' | 'en'
}

export default function FaqSection({ lang = 'uk' }: Props) {
  const [open, setOpen] = useState<number | null>(0)
  const faqs = FAQS[lang]

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-900 text-sm md:text-base pr-4">{faq.q}</span>
            <ChevronDown
              className="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
              style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
