// Central i18n contract for the DentAI landing page.
// One LandingDict per locale lives in ./locales/*.ts and is resolved via ./index.ts.
// Only TEXT lives in the dictionary — purely visual data (icons, brand colors,
// channel letters, status pill colors) stays inside the section components and is
// zipped to the dictionary arrays by index.

export type Locale = 'uk' | 'en' | 'cz'

export type Currency = {
  symbol: string
  code: string
  /** Where the symbol sits relative to the amount. EUR → before, UAH/CZK → after. */
  position: 'before' | 'after'
}

/* ── shared leaf shapes ───────────────────────────────────────── */

export interface NavDict {
  tagline: string
  howItWorks: string
  demo: string
  signIn: string
  bookDemo: string
  bookDemoShort: string
}

export interface ChatBubble {
  role: 'ai' | 'user'
  text: string
}

export interface HeroDict {
  badge: string
  /** Plain headline lines rendered before the highlighted line. */
  headlineLead: string[]
  /** Final headline line, rendered in the accent color. */
  headlineHighlight: string
  subtitle: string
  pills: string[]
  ctaPrimary: string
  ctaSecondary: string
  disclaimer: string
  trust: string[]
  chat: {
    name: string
    status: string
    bubbles: ChatBubble[]
    placeholder: string
    footer: string
  }
}

export interface StatItem {
  stat: string
  text: string
  sub: string
}

export interface ProblemCard {
  label: string
  title: string
  body: string
}

export interface ProblemDict {
  title: string
  subtitle: string
  cards: ProblemCard[]
}

export interface TimelineStep {
  time: string
  day: string
  title: string
  text: string
}

export interface LostTimelineDict {
  title: string
  subtitle: string
  steps: TimelineStep[]
  lossTitle: string
  lossText: string
}

/* ── revenue calculator ───────────────────────────────────────── */

export interface CalculatorDict {
  badge: string
  title: string
  subtitle: string
  callsLabel: string
  callsHint: string
  checkLabel: string
  checkHint: string
  conversionNote: string
  resultLabel: string
  resultSuffix: string
  cta: string
  /** Slider bounds & defaults are locale-specific (different currency scales). */
  callsMin: number
  callsMax: number
  callsDefault: number
  callsStep: number
  checkMin: number
  checkMax: number
  checkDefault: number
  checkStep: number
}

export interface FlowStep {
  title: string
  sub: string
  time: string | null
}

export interface FlowDict {
  title: string
  subtitle: string
  steps: FlowStep[]
  benefits: string[]
}

export interface HowItWorksStep {
  title: string
  body: string
}

export interface HowItWorksDict {
  title: string
  subtitle: string
  steps: HowItWorksStep[]
}

export interface DashboardDialog {
  name: string
  preview: string
  status: string
}

export interface DashboardStat {
  label: string
  value: string
  delta: string
}

export interface DashboardDict {
  title: string
  subtitle: string
  nav: string[]
  stats: DashboardStat[]
  dialogsTitle: string
  dialogsTime: string
  dialogs: DashboardDialog[]
  ctaTitle: string
  ctaText: string
  ctaButton: string
}

export interface ChannelsDict {
  title: string
  subtitle: string
  /** Channel display names, indexed to the visual config in the component. */
  names: string[]
  ctaTitle: string
  ctaText: string
  ctaButton: string
}

export interface DemoDict {
  badge: string
  title: string
  subtitle: string
  bullets: string[]
}

export interface ScenarioItem {
  tag: string
  patient: string
  ai: string
}

export interface ScenariosDict {
  title: string
  subtitle: string
  items: ScenarioItem[]
}

export interface ResultItem {
  value: string
  label: string
}

export interface ResultsDict {
  title: string
  subtitle: string
  items: ResultItem[]
}

export interface TestimonialItem {
  name: string
  role: string
  clinic: string
  text: string
  initials: string
}

export interface TestimonialsDict {
  title: string
  subtitle: string
  items: TestimonialItem[]
}

export interface PricingPlan {
  name: string
  price: string
  period: string
  desc: string
  features: string[]
  highlight: boolean
  cta: string
  ctaHref: string
  /** Shown on the highlighted plan only. */
  popularBadge?: string
  /** Trial footnote under non-contact CTAs. Omit to hide. */
  trialNote?: string
}

export interface PricingDict {
  title: string
  subtitle: string
  footnote: string
  plans: PricingPlan[]
}

export interface TrustItem {
  title: string
  body: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface FaqDict {
  title: string
  subtitle: string
  items: FaqItem[]
}

export interface FinalCtaDict {
  eyebrow: string
  title: string[]
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  disclaimer: string
}

export interface FooterDict {
  tagline: string
  howItWorks: string
  demo: string
  signIn: string
  bookDemo: string
  email: string
  privacy: string
  copyright: string
  badges: string
}

export interface IntegrationGroup {
  /** Localized region label, e.g. "ЄС / Чехія" or "Україна / СНД". */
  label: string
  /** MIS / CRM product names (brand names, locale-invariant). */
  systems: string[]
}

export interface IntegrationsDict {
  badge: string
  title: string
  subtitle: string
  microcopy: string
  groups: IntegrationGroup[]
}

export interface PdfAuditDict {
  triggerCta: string
  modalTitle: string
  modalSubtitle: string
  nameLabel: string
  namePlaceholder: string
  practiceLabel: string
  practicePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  submit: string
  submitting: string
  successTitle: string
  successText: string
  errorText: string
  close: string
}

export interface DemoChatDict {
  initial: string
  quickActions: { label: string; message: string }[]
  placeholder: string
  online: string
  error: string
  /** Teaser shown by the floating chat widget after a few seconds. */
  tooltip: string
}

/* ── root contract ────────────────────────────────────────────── */

export interface LandingDict {
  locale: Locale
  currency: Currency
  nav: NavDict
  hero: HeroDict
  stats: StatItem[]
  problem: ProblemDict
  lostTimeline: LostTimelineDict
  calculator: CalculatorDict
  flow: FlowDict
  howItWorks: HowItWorksDict
  integrations: IntegrationsDict
  pdfAudit: PdfAuditDict
  dashboard: DashboardDict
  channels: ChannelsDict
  demo: DemoDict
  scenarios: ScenariosDict
  results: ResultsDict
  testimonials: TestimonialsDict
  pricing: PricingDict
  trust: TrustItem[]
  faq: FaqDict
  finalCta: FinalCtaDict
  footer: FooterDict
  demoChat: DemoChatDict
}
