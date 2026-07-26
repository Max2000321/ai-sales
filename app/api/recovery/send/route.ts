import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { sendWhatsAppButtons } from '@/lib/whatsapp'

const CHECKIN_COPY: Record<'4h' | '24h', (procedure: string) => string> = {
  '4h': procedure => `Вітаємо! Минуло 4 години після процедури «${procedure}». Як ваше самопочуття?`,
  '24h': procedure => `Доброго дня! Минула доба після процедури «${procedure}». Як ви себе почуваєте сьогодні?`,
}

const BUTTONS = [
  { id: 'feeling_great', title: 'Feeling Great' },
  { id: 'mild_pain', title: 'Mild Pain' },
  { id: 'request_doctor', title: 'Request Doctor' },
]

/**
 * Cron-triggered (see vercel.json): sends any due post-care check-ins.
 * Protected by CRON_SECRET when set, matching Vercel Cron's Authorization header convention.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createAdminClient()
  const { data: due } = await admin
    .from('recovery_checkins')
    .select('id, patient_phone, procedure, checkin_stage')
    .eq('status', 'pending')
    .lte('scheduled_for', new Date().toISOString())
    .limit(50)

  let sent = 0
  for (const checkin of due || []) {
    const stage = checkin.checkin_stage as '4h' | '24h'
    const body = CHECKIN_COPY[stage](checkin.procedure)
    const ok = await sendWhatsAppButtons(checkin.patient_phone, body, BUTTONS)
    await admin
      .from('recovery_checkins')
      .update(ok ? { status: 'sent', sent_at: new Date().toISOString() } : { sent_at: new Date().toISOString() })
      .eq('id', checkin.id)
    if (ok) sent++
  }

  return NextResponse.json({ due: due?.length ?? 0, sent })
}
