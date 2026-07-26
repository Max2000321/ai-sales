/**
 * Conversation tag catalog. Kept dependency-free (no Anthropic SDK import) so
 * client components (the inbox UI) can use it without pulling server-only
 * code into the browser bundle — see lib/ai/tagger.ts for the pipeline itself.
 */

export type ConversationTag = 'hot_lead' | 'price_checking' | 'booked' | 'follow_up' | 'escalated'

export const TAG_META: Record<ConversationTag, { label: string; emoji: string }> = {
  hot_lead: { label: 'Hot Lead', emoji: '🔥' },
  price_checking: { label: 'Price Checking', emoji: '💸' },
  booked: { label: 'Booked', emoji: '✅' },
  follow_up: { label: 'Follow-up Needed', emoji: '⏳' },
  escalated: { label: 'Escalated', emoji: '⚠️' },
}
