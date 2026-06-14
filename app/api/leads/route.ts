import { NextRequest, NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface LeadBody {
  name?: string
  practice?: string
  email?: string
  lead_type?: string
  calls?: number
  check?: number
  monthlyLoss?: number
  currency?: string
  locale?: string
}

export async function POST(req: NextRequest) {
  let body: LeadBody
  try {
    body = (await req.json()) as LeadBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, practice, email, lead_type, calls, check, monthlyLoss, currency, locale } = body

  // ── strict server-side validation ──
  if (typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 })
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
  }

  const cleanName = name.trim()
  const cleanEmail = email.trim()
  const tag = lead_type || 'lead'

  // Structured payload — always logged for traceability, regardless of delivery outcome.
  const payload = {
    lead_type: tag,
    name: cleanName,
    practice: practice ?? null,
    email: cleanEmail,
    calls: calls ?? null,
    check: check ?? null,
    monthlyLoss: monthlyLoss ?? null,
    currency: currency ?? null,
    locale: locale ?? null,
    at: new Date().toISOString(),
  }
  console.info('[lead]', JSON.stringify(payload))

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL || 'hello@dentai.app'

  // No mail provider configured (e.g. local dev) — lead is captured & logged, not delivered.
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — lead not emailed', { tag, email: cleanEmail })
    return NextResponse.json({ success: true, delivered: false }, { status: 201 })
  }

  const lossLine = monthlyLoss != null
    ? `${monthlyLoss}${currency ? ' ' + currency : ''}`
    : '—'

  const html = `
    <h2>DentAI — нова заявка (${tag})</h2>
    <table style="border-collapse:collapse;width:100%;max-width:520px">
      <tr><td style="padding:8px;font-weight:bold;color:#555">Тип</td><td style="padding:8px">${tag}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Ім'я</td><td style="padding:8px">${cleanName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555">Клініка</td><td style="padding:8px">${practice || '—'}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px"><a href="mailto:${cleanEmail}">${cleanEmail}</a></td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555">Локаль</td><td style="padding:8px">${locale || '—'}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Калькулятор</td><td style="padding:8px">${calls ?? '—'} звернень/день · чек ${check ?? '—'}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555">Втрати/міс</td><td style="padding:8px">${lossLine}</td></tr>
    </table>
    <p style="margin-top:24px;color:#888;font-size:12px">Відправлено з dentai.app — lead pipeline</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DentAI <onboarding@resend.dev>',
      to: [toEmail],
      reply_to: cleanEmail,
      subject: `DentAI lead [${tag}]: ${cleanName} — ${practice || 'без назви'}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error (leads):', err)
    return NextResponse.json({ success: false, delivered: false, error: 'Email send failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true, delivered: true }, { status: 201 })
}

// Any non-POST method is not allowed on this endpoint.
function methodNotAllowed() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
export const GET = methodNotAllowed
export const PUT = methodNotAllowed
export const DELETE = methodNotAllowed
export const PATCH = methodNotAllowed
