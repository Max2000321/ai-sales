import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function generateSalesResponse(
  userMessage: string,
  knowledgeChunks: string[],
  agentName: string,
  systemPrompt: string
): Promise<string> {
  const context = knowledgeChunks.length > 0
    ? `\n\nКонтекст из базы знаний компании:\n${knowledgeChunks.join('\n\n---\n\n')}`
    : ''

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: `${systemPrompt}${context}\n\nKeep answers short and conversational — 2-4 sentences max. No markdown, no tables, no bullet points. Plain text only. If information is not available, politely say so and suggest contacting the team.`,
    messages: [{ role: 'user', content: userMessage }],
  })

  const content = response.content[0]
  return content.type === 'text' ? content.text : ''
}
