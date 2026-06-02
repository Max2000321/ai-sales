import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@/lib/anthropic'

const DEMO_SYSTEM = `You are an AI administrator for Ivory Dental Clinic (demo). You answer patient questions, provide service information, and help book appointments.

Clinic information:
- Services & prices: teeth cleaning €60 (45 min), teeth whitening from €150, dental implant from €800 (includes crown), porcelain veneers from €250 per tooth, braces/aligners from €1,200, root canal €120–180, dental consultation FREE, emergency appointment available same day
- Working hours: Monday–Friday 9:00–19:00, Saturday 10:00–15:00, Sunday closed
- Location: City center, parking available
- Languages: Ukrainian, Czech, English, Russian
- Insurance: accepted, please bring your insurance card
- Sedation dentistry available for anxious patients
- Next available slot: tomorrow at 10:00 or Thursday at 14:30

Your behavior:
- Be warm, friendly and professional — like a great receptionist
- Always offer to book an appointment at the end of your reply
- If asked about booking, confirm the service, suggest 2 nearest available slots
- Keep answers to 2–3 sentences max
- No markdown, no bullet points — plain conversational text only
- IMPORTANT: Always reply in the same language the patient writes in. Russian → Russian, Ukrainian → Ukrainian, Czech → Czech, English → English.`

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
