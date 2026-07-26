/**
 * WhatsApp Cloud API client (Meta), used for post-care recovery check-ins.
 * Requires WHATSAPP_ACCESS_TOKEN + WHATSAPP_PHONE_NUMBER_ID to be configured —
 * same setup shape as the Instagram/Meta integration (see lib/meta.ts). Until
 * those are set, sends are logged and skipped rather than throwing, mirroring
 * how sendChatLead degrades when RESEND_API_KEY is missing.
 */

const GRAPH_VERSION = 'v21.0'

function credentials(): { token: string; phoneId: string } | null {
  const token = process.env.WHATSAPP_ACCESS_TOKEN
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!token || !phoneId) return null
  return { token, phoneId }
}

interface CheckinButton {
  id: string
  title: string
}

/** Sends a plain text WhatsApp message. Returns true on success. */
export async function sendWhatsAppText(to: string, body: string): Promise<boolean> {
  const creds = credentials()
  if (!creds) {
    console.warn('WHATSAPP_ACCESS_TOKEN/WHATSAPP_PHONE_NUMBER_ID not set — WhatsApp message not sent', { to })
    return false
  }

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${creds.phoneId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${creds.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body },
      }),
    })
    if (!res.ok) {
      console.error('WhatsApp send error:', await res.text())
      return false
    }
    return true
  } catch (e) {
    console.error('sendWhatsAppText failed:', e)
    return false
  }
}

/** Sends a message with up to 3 quick-reply buttons (used for recovery check-ins). */
export async function sendWhatsAppButtons(to: string, body: string, buttons: CheckinButton[]): Promise<boolean> {
  const creds = credentials()
  if (!creds) {
    console.warn('WHATSAPP_ACCESS_TOKEN/WHATSAPP_PHONE_NUMBER_ID not set — WhatsApp check-in not sent', { to })
    return false
  }

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${creds.phoneId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${creds.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: { text: body },
          action: {
            buttons: buttons.map(b => ({ type: 'reply', reply: { id: b.id, title: b.title } })),
          },
        },
      }),
    })
    if (!res.ok) {
      console.error('WhatsApp send error:', await res.text())
      return false
    }
    return true
  } catch (e) {
    console.error('sendWhatsAppButtons failed:', e)
    return false
  }
}
