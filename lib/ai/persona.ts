/**
 * Tone + proactive-scenario catalog for the AI persona settings page.
 * Kept dependency-free (no Anthropic SDK import) so client components can use
 * it directly without pulling server-only code into the browser bundle.
 */

export type AiTone = 'clinical' | 'warm' | 'sales'

export interface AiScenario {
  id: string
  enabled: boolean
}

export const TONE_INSTRUCTIONS: Record<AiTone, string> = {
  clinical:
    'ТОН: формальний і клінічний. Використовуй точну термінологію, короткі структуровані речення, без емодзі та розмовних зворотів.',
  warm:
    'ТОН: теплий і розмовний. Пиши як турботливий адміністратор, з емпатією; можна помірно використовувати м’які емодзі (😊, 👍).',
  sales:
    'ТОН: орієнтований на продаж. Підкреслюй цінність послуг, акуратно веди розмову до запису на прийом, пропонуй акції та пакети, коли це доречно — не будь нав’язливим.',
}

export const SCENARIO_CATALOG: Record<string, { label: string; prompt: string }> = {
  invisalign_promo: {
    label: 'Invisalign Promo',
    prompt:
      'Якщо пацієнт запитує про вирівнювання зубів, брекети або естетику усмішки — згадай, що зараз діє акція на елайнери Invisalign, і запропонуй безкоштовну консультацію.',
  },
  hygiene_reminder: {
    label: 'Hygiene Reminder',
    prompt:
      'Якщо з розмови видно, що пацієнт давно не робив професійну чистку зубів, або сам про це питає — нагадай про важливість регулярної гігієни й запропонуй запис.',
  },
  too_expensive: {
    label: 'Handling "Too Expensive"',
    prompt:
      'Якщо пацієнт каже, що це дорого — не знижуй ціну сам. Поясни цінність (якість, гарантія, досвід лікарів), за наявності запропонуй розстрочку та безкоштовну консультацію для точного плану лікування.',
  },
}

/** Appends tone instructions and any enabled proactive-scenario triggers to the system prompt. */
export function buildPersonaAddendum(tone?: AiTone | null, scenarios?: AiScenario[] | null): string {
  const parts: string[] = []
  if (tone && TONE_INSTRUCTIONS[tone]) parts.push(TONE_INSTRUCTIONS[tone])

  const activeLines = (scenarios || [])
    .filter(s => s.enabled)
    .map(s => SCENARIO_CATALOG[s.id]?.prompt)
    .filter((p): p is string => !!p)
  if (activeLines.length) parts.push(`АКТИВНІ СЦЕНАРІЇ:\n${activeLines.map(l => `- ${l}`).join('\n')}`)

  return parts.length ? `\n\n${parts.join('\n\n')}` : ''
}
