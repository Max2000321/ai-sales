/**
 * Send a lead captured mid-conversation by the agent (capture_lead tool).
 * Uses the same Resend setup as /api/contact and /api/leads. SOS leads get an
 * urgent subject so the clinic spots emergencies in their inbox immediately.
 */
export async function sendChatLead(opts: {
  name: string
  phone: string
  channel: string
  summary: string
  sos: boolean
  agentName: string
}): Promise<boolean> {
  const { name, phone, channel, summary, sos, agentName } = opts

  // Always log for traceability, regardless of delivery.
  console.info('[chat-lead]', JSON.stringify({ name, phone, channel, sos, summary, agentName, at: new Date().toISOString() }))

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL || 'hello@dentai.app'
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — chat lead not emailed', { name, phone, sos })
    return false
  }

  const subject = sos
    ? `[СРОЧНО] DentAI: Острая боль у пациента! — ${name}`
    : `DentAI: нова заявка з чату — ${name} (${channel})`

  const banner = sos
    ? `<div style="background:#fee2e2;color:#b91c1c;font-weight:bold;padding:12px 16px;border-radius:8px;margin-bottom:16px">🚨 СРОЧНО · ОСТРАЯ БОЛЬ — свяжитесь с пациентом немедленно</div>`
    : ''

  const html = `
    ${banner}
    <h2 style="margin:0 0 12px">${sos ? 'Срочная заявка' : 'Новая заявка'} из чата (${channel})</h2>
    <table style="border-collapse:collapse;width:100%;max-width:520px">
      <tr><td style="padding:8px;font-weight:bold;color:#555">Агент</td><td style="padding:8px">${agentName}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Имя</td><td style="padding:8px">${name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555">Телефон</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Канал</td><td style="padding:8px">${channel}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555">Статус</td><td style="padding:8px">${sos ? 'SOS' : 'PLAN'}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Суть обращения</td><td style="padding:8px">${summary}</td></tr>
    </table>
    <p style="margin-top:24px;color:#888;font-size:12px">Отправлено агентом DentAI — chat lead pipeline</p>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'DentAI <onboarding@resend.dev>',
        to: [toEmail],
        subject,
        html,
      }),
    })
    if (!res.ok) {
      console.error('Resend error (chat lead):', await res.text())
      return false
    }
    return true
  } catch (e) {
    console.error('sendChatLead failed:', e)
    return false
  }
}
