import Anthropic from '@anthropic-ai/sdk'
import { anthropic, type ChatTurn } from '@/lib/anthropic'
import { TAG_META, type ConversationTag } from '@/lib/ai/tags'

export type { ConversationTag }
export { TAG_META }

export interface ConversationInsights {
  tags: ConversationTag[]
  leadScore: number
  budgetPreference: string
  nextSteps: string
}

const EMPTY_INSIGHTS: ConversationInsights = { tags: [], leadScore: 0, budgetPreference: 'unknown', nextSteps: '' }

const ANALYZE_TOOL: Anthropic.Tool = {
  name: 'submit_analysis',
  description: 'Submit the structured analysis of this patient conversation. Call this exactly once.',
  input_schema: {
    type: 'object',
    properties: {
      tags: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['hot_lead', 'price_checking', 'booked', 'follow_up', 'escalated'],
        },
        description:
          'Tags that clearly apply, in order of relevance. hot_lead = ready to book soon; price_checking = mainly asking about cost; booked = an appointment was confirmed; follow_up = needs a human to check back; escalated = pain/emergency or the AI could not help.',
      },
      lead_score: {
        type: 'integer',
        description: 'How likely this patient is to book and pay, from 0 (cold) to 100 (certain).',
      },
      budget_preference: {
        type: 'string',
        description: 'Any signal about budget/price sensitivity the patient expressed, in Ukrainian. "unknown" if none.',
      },
      next_steps: {
        type: 'string',
        description: 'One concrete, actionable next step for clinic staff, in Ukrainian, one short sentence.',
      },
    },
    required: ['tags', 'lead_score', 'budget_preference', 'next_steps'],
    additionalProperties: false,
  },
  strict: true,
}

interface ToolInput {
  tags: string[]
  lead_score: number
  budget_preference: string
  next_steps: string
}

/**
 * Background LLM pipeline: analyzes a chat transcript and returns strict,
 * validated JSON — tags, a lead score, budget signal, and a recommended next
 * step. Runs on a cheap/fast model since it's a utility classification task,
 * not the patient-facing conversation itself.
 */
export async function analyzeConversation(messages: ChatTurn[]): Promise<ConversationInsights> {
  if (messages.length === 0) return EMPTY_INSIGHTS

  const transcript = messages
    .slice(-30)
    .map(m => `${m.role === 'user' ? 'Пацієнт' : 'Агент'}: ${m.content}`)
    .join('\n')

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    system:
      'Ти аналізуєш переписку між пацієнтом стоматологічної клініки та AI-адміністратором для внутрішньої панелі персоналу. ' +
      'Виклич submit_analysis рівно один раз із результатом аналізу цієї переписки.',
    messages: [{ role: 'user', content: `Ось переписка:\n\n${transcript}` }],
    tools: [ANALYZE_TOOL],
    tool_choice: { type: 'tool', name: 'submit_analysis' },
  })

  const toolUse = response.content.find((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use')
  if (!toolUse) return EMPTY_INSIGHTS

  const input = toolUse.input as ToolInput
  const validTags = new Set<string>(Object.keys(TAG_META))

  return {
    tags: (input.tags || []).filter((t): t is ConversationTag => validTags.has(t)),
    leadScore: Math.max(0, Math.min(100, Math.round(input.lead_score ?? 0))),
    budgetPreference: input.budget_preference?.trim() || 'unknown',
    nextSteps: input.next_steps?.trim() || '',
  }
}
