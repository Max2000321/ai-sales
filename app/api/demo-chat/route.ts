import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@/lib/anthropic'

type Locale = 'uk' | 'en' | 'cz'

// Price list per locale — currency matches the clinic's landing page, not the
// patient's language (a CZ clinic quotes in Kč even if asked in Russian).
const PRICES: Record<Locale, string> = {
  uk: 'чищення 1200 грн / 45 хв, відбілювання від 4000 грн, імплант від 18000 грн з коронкою, вінири від 6000 грн за зуб, брекети від 25000 грн, лікування каналів 2500–4000 грн, консультація безкоштовно',
  en: 'cleaning €60 / 45 min, whitening from €150, implant from €800 with crown, veneers from €250 per tooth, braces from €1200, root canal treatment €120–180, consultation free',
  cz: 'čištění 1500 Kč / 45 min, bělení od 4000 Kč, implantát od 20000 Kč s korunkou, fazety od 6500 Kč za zub, rovnátka od 30000 Kč, ošetření kořenových kanálků 3000–4500 Kč, konzultace zdarma',
}

function buildSystem(locale: Locale): string {
  return `Ти AI-адміністратор стоматологічної клініки Ivory Dental. Відповідай коротко і по справі. Можеш записувати на прийом (пропонуй слоти: завтра 10:00, 14:30, післязавтра 11:00, 16:00), розповідати про ціни (${PRICES[locale]}), переносити та скасовувати записи. Завжди будь привітним і пропонуй конкретний наступний крок.

Додаткова інформація:
- Графік: Пн–Пт 9:00–19:00, Сб 10:00–15:00, Нд — вихідний
- Термінові прийоми доступні того ж дня
- Страховка приймається
- Седація для тривожних пацієнтів є

Правила відповідей:
- Відповідай максимум 2–3 реченнями
- Без маркдауну, без списків — тільки живий розмовний текст
- IMPORTANT: завжди називай ціни ТІЛЬКИ у валюті з прайсу вище, не конвертуй у євро чи іншу валюту.
- IMPORTANT: Always reply in the same language the patient writes in. Russian → Russian, Ukrainian → Ukrainian, Czech → Czech, English → English, Polish → Polish.`
}

export async function POST(req: NextRequest) {
  const { message, history, locale } = await req.json()
  if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 })

  const loc: Locale = locale === 'en' || locale === 'cz' ? locale : 'uk'

  const messages = [
    ...(history || []).slice(-8),
    { role: 'user' as const, content: message },
  ]

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    system: buildSystem(loc),
    messages,
  })

  const content = response.content[0]
  const reply = content.type === 'text' ? content.text : ''
  return NextResponse.json({ reply })
}
