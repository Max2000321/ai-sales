import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@/lib/anthropic'

const DEMO_SYSTEM = `You are a friendly sales assistant for SalesAI — a platform that lets businesses create AI agents to answer customer questions 24/7.

About SalesAI:
- Businesses connect their FAQ, documents and knowledge base
- AI answers customer questions automatically, 24/7
- Takes 10 minutes to set up, no coding required
- Pricing: Starter €49/mo (1 agent, 500 messages), Pro €149/mo (3 agents, 5000 messages, analytics), Enterprise custom
- Free trial available, no credit card required
- Supports PDF, TXT, FAQ text upload
- Widget embeds on any website with one line of code
- Built on advanced AI technology

Keep answers short and conversational — 2-4 sentences max. No markdown, no bullet points. Plain text only. Be helpful and friendly. If asked something outside SalesAI, gently redirect to how SalesAI can help their business.`

export async function POST(req: NextRequest) {
  const { message, history } = await req.json()

  if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 })

  const messages = [
    ...(history || []).slice(-6),
    { role: 'user' as const, content: message },
  ]

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    system: DEMO_SYSTEM,
    messages,
  })

  const content = response.content[0]
  const reply = content.type === 'text' ? content.text : ''

  return NextResponse.json({ reply })
}
