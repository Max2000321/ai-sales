import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, practice, email, lead_type, calls, check, monthlyLoss, currency, locale } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL || 'hello@dentai.app'
  const tag = lead_type || 'lead'

  if (!apiKey) {
    // No API key configured — still return success (silent fail in dev), matches /api/contact.
    console.warn('RESEND_API_KEY not set — lead not emailed', { tag, email })
    return NextResponse.json({ ok: true })
  }

  const lossLine = monthlyLoss != null
    ? `${monthlyLoss}${currency ? ' ' + currency : ''}`
    : '—'

  const html = `
    <h2>DentAI — нова заявка (${tag})</h2>
    <table style="border-collapse:collapse;width:100%;max-width:520px">
      <tr><td style="padding:8px;font-weight:bold;color:#555">Тип</td><td style="padding:8px">${tag}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Ім'я</td><td style="padding:8px">${name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555">Клініка</td><td style="padding:8px">${practice || '—'}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
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
      reply_to: email,
      subject: `DentAI lead [${tag}]: ${name} — ${practice || 'без назви'}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error (leads):', err)
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
