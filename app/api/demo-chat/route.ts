import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@/lib/anthropic'

const DEMO_SYSTEM = `Ти AI-адміністратор стоматологічної клініки Ivory Dental. Відповідай коротко і по справі. Можеш записувати на прийом (пропонуй слоти: завтра 10:00, 14:30, післязавтра 11:00, 16:00), розповідати про ціни (чищення €60 / 45 хв, відбілювання від €150, імплант від €800 з коронкою, вінири від €250 за зуб, брекети від €1200, лікування каналів €120–180, консультація безкоштовно), переносити та скасовувати записи. Завжди будь привітним і пропонуй конкретний наступний крок.

Додаткова інформація:
- Графік: Пн–Пт 9:00–19:00, Сб 10:00–15:00, Нд — вихідний
- Термінові прийоми доступні того ж дня
- Страховка приймається
- Седація для тривожних пацієнтів є

Правила відповідей:
- Відповідай максимум 2–3 реченнями
- Без маркдауну, без списків — тільки живий розмовний текст
- IMPORTANT: Always reply in the same language the patient writes in. Russian → Russian, Ukrainian → Ukrainian, Czech → Czech, English → English, Polish → Polish.`

export async function POST(req: NextRequest) {
  const { message, history } = await req.json()
  if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 })

  const messages = [
    ...(history || []).slice(-8),
    { role: 'user' as const, content: message },
  ]

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    system: DEMO_SYSTEM,
    messages,
  })

  const content = response.content[0]
  const reply = content.type === 'text' ? content.text : ''
  return NextResponse.json({ reply })
}
