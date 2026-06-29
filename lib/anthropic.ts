import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

/** Structured lead the model emits via the capture_lead tool. */
export interface LeadCapture {
  patient_name: string
  patient_phone: string
  sos: boolean
  summary: string
}

const CAPTURE_LEAD_TOOL: Anthropic.Tool = {
  name: 'capture_lead',
  description:
    'Сохрани заявку пациента, КАК ТОЛЬКО стали известны и имя, И номер телефона пациента. ' +
    'Вызови этот инструмент ровно один раз за диалог, когда оба поля получены. ' +
    'Если обращение связано с острой болью, сильным отёком, кровотечением или травмой (триаж) — ставь sos=true, иначе false. ' +
    'Не сообщай пациенту, что вызываешь инструмент; просто продолжи разговор обычным сообщением.',
  input_schema: {
    type: 'object',
    properties: {
      patient_name: { type: 'string', description: 'Имя пациента' },
      patient_phone: { type: 'string', description: 'Номер телефона пациента' },
      sos: { type: 'boolean', description: 'true для острой боли/отёка/кровотечения/травмы, иначе false' },
      summary: { type: 'string', description: 'Краткая суть обращения (например: острая боль слева внизу / вопрос по цене имплантации)' },
    },
    required: ['patient_name', 'patient_phone', 'sos', 'summary'],
    additionalProperties: false,
  },
  strict: true,
}

const DEFAULT_STOP_MEDS =
  'Я — виртуальный ассистент и не могу назначать лечение. Чтобы помочь вам безопасно, необходим осмотр врача.'

/** Build the ${...} substitution map from an agent record's config columns. */
export function promptVarsFromAgent(agent: {
  clinic_phone?: string | null
  consultation_duration?: string | null
  treatment_duration?: string | null
  cancellation_policy?: string | null
  stop_meds_text?: string | null
}): Record<string, string> {
  return {
    clinic_phone: agent.clinic_phone || '',
    consultation_duration: agent.consultation_duration || '',
    treatment_duration: agent.treatment_duration || '',
    cancellation_policy: agent.cancellation_policy || '',
    stop_meds_text: agent.stop_meds_text || DEFAULT_STOP_MEDS,
  }
}

/** Substitute ${key} placeholders in a prompt with per-clinic config values. */
function fillPromptVars(text: string, vars?: Record<string, string>): string {
  if (!vars) return text
  return text.replace(/\$\{(\w+)\}/g, (m, key) => {
    if (key in vars) {
      const v = (vars[key] ?? '').trim()
      return v || '(уточните у администратора)'
    }
    return m
  })
}

/**
 * Generate an agent reply with full conversation history and optional lead
 * capture. When onLead is provided, the model is given the capture_lead tool;
 * its tool call fires onLead and the patient only ever sees plain text.
 * promptVars fills ${clinic_phone}-style placeholders with per-clinic config.
 */
export async function generateAgentReply(opts: {
  message: string
  history?: ChatTurn[]
  knowledgeChunks: string[]
  agentName: string
  systemPrompt: string
  promptVars?: Record<string, string>
  onLead?: (lead: LeadCapture) => Promise<unknown>
}): Promise<string> {
  const { message, history = [], knowledgeChunks, agentName, systemPrompt, promptVars, onLead } = opts

  const filledPrompt = fillPromptVars(systemPrompt, promptVars)
  const context = knowledgeChunks.length > 0
    ? `\n\nКонтекст из базы знаний компании:\n${knowledgeChunks.join('\n\n---\n\n')}`
    : ''
  const system = `${filledPrompt}${context}\n\nKeep answers short and conversational — 2-4 sentences max. No markdown, no tables, no bullet points. Plain text only.`

  const messages: Anthropic.MessageParam[] = [
    ...history.slice(-10).map(h => ({ role: h.role, content: h.content })),
    { role: 'user' as const, content: message },
  ]

  // Up to 3 iterations: the model may call capture_lead, then produce text.
  for (let i = 0; i < 3; i++) {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system,
      messages,
      ...(onLead ? { tools: [CAPTURE_LEAD_TOOL] } : {}),
    })

    const toolUses = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
    )

    if (response.stop_reason === 'tool_use' && toolUses.length) {
      messages.push({ role: 'assistant', content: response.content })
      const results: Anthropic.ToolResultBlockParam[] = []
      for (const tu of toolUses) {
        if (tu.name === 'capture_lead' && onLead) {
          try {
            await onLead(tu.input as LeadCapture)
          } catch (e) {
            console.error('capture_lead handler failed:', e)
          }
        }
        results.push({ type: 'tool_result', tool_use_id: tu.id, content: 'OK' })
      }
      messages.push({ role: 'user', content: results })
      continue
    }

    const text = response.content.find(
      (b): b is Anthropic.TextBlock => b.type === 'text'
    )
    return text ? text.text : ''
  }
  return ''
}

/** Legacy single-shot helper (no history, no tools). Kept for compatibility. */
export async function generateSalesResponse(
  userMessage: string,
  knowledgeChunks: string[],
  agentName: string,
  systemPrompt: string
): Promise<string> {
  return generateAgentReply({ message: userMessage, knowledgeChunks, agentName, systemPrompt })
}
