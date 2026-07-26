import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { verifyMetaSignature } from '@/lib/meta'

// ── GET: Meta webhook verification handshake (same scheme as Instagram) ──
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')
  if (mode === 'subscribe' && token && token === process.env.META_VERIFY_TOKEN) {
    return new NextResponse(challenge || '', { status: 200 })
  }
  return new NextResponse('forbidden', { status: 403 })
}

interface WhatsAppWebhookBody {
  entry?: {
    changes?: {
      value?: {
        messages?: {
          from?: string
          type?: string
          interactive?: { type?: string; button_reply?: { id?: string } }
        }[]
      }
    }[]
  }[]
}

const STATUS_FROM_BUTTON: Record<string, 'feeling_great' | 'mild_pain' | 'request_doctor'> = {
  feeling_great: 'feeling_great',
  mild_pain: 'mild_pain',
  request_doctor: 'request_doctor',
}

// ── POST: patient replies to a check-in ──
export async function POST(req: NextRequest) {
  const raw = await req.text()
  if (!verifyMetaSignature(raw, req.headers.get('x-hub-signature-256'))) {
    return new NextResponse('bad signature', { status: 403 })
  }

  const body = JSON.parse(raw) as WhatsAppWebhookBody
  const admin = createAdminClient()

  for (const entry of body.entry || []) {
    for (const change of entry.changes || []) {
      for (const message of change.value?.messages || []) {
        const buttonId = message.interactive?.button_reply?.id
        const from = message.from
        if (!buttonId || !from || message.interactive?.type !== 'button_reply') continue

        const status = STATUS_FROM_BUTTON[buttonId]
        if (!status) continue

        // Match the most recently sent, still-open check-in for this phone number.
        const { data: checkin } = await admin
          .from('recovery_checkins')
          .select('id')
          .eq('patient_phone', from)
          .eq('status', 'sent')
          .order('sent_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (checkin) {
          await admin
            .from('recovery_checkins')
            .update({ status, responded_at: new Date().toISOString() })
            .eq('id', checkin.id)
        }
      }
    }
  }

  return NextResponse.json({ ok: true })
}
