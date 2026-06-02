import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, clinic, phone, email, message } = await req.json()

  if (!name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL || 'hello@dentai.app'

  if (!apiKey) {
    // No API key configured — still return success (silent fail in dev)
    console.warn('RESEND_API_KEY not set')
    return NextResponse.json({ ok: true })
  }

  const html = `
    <h2>Нова заявка з сайту DentAI — тариф «Мережа»</h2>
    <table style="border-collapse:collapse;width:100%;max-width:500px">
      <tr><td style="padding:8px;font-weight:bold;color:#555">Ім'я</td><td style="padding:8px">${name}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Клініка / Мережа</td><td style="padding:8px">${clinic || '—'}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555">Телефон</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555">Коментар</td><td style="padding:8px">${message || '—'}</td></tr>
    </table>
    <p style="margin-top:24px;color:#888;font-size:12px">Відправлено з dentai.app/contact</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DentAI <noreply@dentai.app>',
      to: [toEmail],
      reply_to: email,
      subject: `Нова заявка: ${name} — ${clinic || 'без назви'}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
