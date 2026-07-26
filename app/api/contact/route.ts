import { NextRequest, NextResponse } from 'next/server'
import { sendTransactionalEmail } from '@/lib/notify'

export async function POST(req: NextRequest) {
  const { name, clinic, phone, email, message } = await req.json()

  if (!name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const toEmail = process.env.CONTACT_EMAIL || 'hello@dentai.app'

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

  const delivered = await sendTransactionalEmail({
    to: [toEmail],
    replyTo: email,
    subject: `Нова заявка: ${name} — ${clinic || 'без назви'}`,
    html,
    kind: 'contact_form',
    payload: { name, clinic, phone, email, message },
  })

  if (!delivered) {
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
