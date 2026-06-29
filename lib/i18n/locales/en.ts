import { LandingDict } from '../types'

export const en: LandingDict = {
  locale: 'en',
  currency: { symbol: '€', code: 'EUR', position: 'before' },

  nav: {
    tagline: 'for dental clinics',
    howItWorks: 'How it works',
    demo: 'Demo',
    signIn: 'Sign in',
    bookDemo: 'Book a demo',
    bookDemoShort: 'Demo',
  },

  hero: {
    badge: 'AI Administrator for Dental Clinics',
    headlineLead: ['While your clinic is closed —'],
    headlineHighlight: 'patients book with competitors',
    subtitle:
      'DentAI responds to patients on your website, Instagram, Telegram and WhatsApp 24/7 — and automatically books appointments.',
    pills: ['Replaces your receptionist', 'Responds in 2 seconds', 'Books appointments 24/7'],
    ctaPrimary: 'Try free for 14 days',
    ctaSecondary: 'See how it works ↓',
    disclaimer: 'First 14 days free · No credit card required · Cancel anytime',
    trust: ['Live in 24 hours', 'No technical skills needed', 'GDPR-compliant'],
    chat: {
      name: 'Ivory Dental',
      status: 'replies instantly',
      bubbles: [
        { role: 'ai', text: 'Hello! How can I help you today? 😊' },
        { role: 'user', text: "I'd like to book a cleaning. Any slots this week?" },
        { role: 'ai', text: 'Sure! Thursday at 10:00 or Friday at 14:30. Cleaning is 45 min, €60. Which works?' },
        { role: 'user', text: 'Thursday at 10 👍' },
        { role: 'ai', text: 'Done! Please share your name and phone number to confirm.' },
      ],
      placeholder: 'Write a message...',
      footer: '11:47 PM · response in 2 seconds',
    },
  },

  stats: [
    { stat: '73%', text: 'of patients choose the clinic that responds first', sub: 'Harvard Medical School research, 2023' },
    { stat: '4+ hrs', text: 'average response time from a human administrator', sub: 'By then, the patient has already booked elsewhere' },
    { stat: '15–20', text: 'inquiries lost per clinic per week after closing time', sub: 'That is 60–80 potential patients per month' },
  ],

  problem: {
    title: 'How many patients did your clinic lose last week?',
    subtitle: "Most dental clinic owners don't know this number. But it exists.",
    cards: [
      { label: 'Every evening', title: 'After 7 PM', body: 'A patient messaged your Instagram at 9 PM. Your receptionist will see it tomorrow morning. By then they have already booked with another clinic.' },
      { label: 'Daily reality', title: 'Slow response', body: "Even during the day, your receptionist is busy — people waiting, phone ringing. That Telegram message waits 2–4 hours. The patient doesn't wait." },
      { label: 'Direct financial loss', title: 'The real cost', body: 'One missed patient = €50–500 depending on the procedure. 15 missed per week = up to €7,500 in direct losses per month.' },
    ],
  },

  lostTimeline: {
    title: 'This is how your clinic loses a patient',
    subtitle: "It happens every evening. And you don't know about it.",
    steps: [
      { time: '8:47 PM', day: 'Monday', title: 'Patient writes on WhatsApp', text: '"Good evening! I\'d like to book a teeth cleaning. Do you have slots this week?"' },
      { time: '8:47 PM', day: 'Monday', title: 'No response from the clinic', text: 'The working day ended at 7 PM. The message went unread.' },
      { time: '8:51 PM', day: 'Monday', title: 'Patient searches for another clinic', text: '4 minutes without a reply. He opens Google and finds your competitor.' },
      { time: '8:55 PM', day: 'Monday', title: 'Patient books with a competitor', text: "The competitor replied in 30 seconds. Appointment booked. He won't come back to you." },
      { time: '9:12 AM', day: 'Tuesday', title: 'Your receptionist sees the message', text: 'Too late. The patient is already at your competitor. This cost you €60–500.' },
    ],
    lossTitle: '15–20 situations like this every week.',
    lossText: "That's €750–10,000 in direct losses per month — depending on your prices and services.",
  },

  calculator: {
    badge: 'Revenue loss calculator',
    title: 'How much money is your clinic losing?',
    subtitle: 'Drag the sliders to see how much revenue your clinic loses every month from unanswered inquiries.',
    callsLabel: 'Missed inquiries per day',
    callsHint: 'after hours and on weekends',
    checkLabel: 'Average patient value',
    checkHint: 'value of a typical visit',
    conversionNote: 'We assume 30% of inquiries would have booked if answered instantly.',
    resultLabel: 'Hidden losses of the clinic:',
    resultSuffix: 'in missed revenue',
    cta: 'Stop losing revenue — book a demo',
    callsMin: 1, callsMax: 50, callsDefault: 5, callsStep: 1,
    checkMin: 50, checkMax: 1000, checkDefault: 150, checkStep: 10,
  },

  flow: {
    title: 'How it works with DentAI',
    subtitle: 'Same patient. Different outcome.',
    steps: [
      { title: 'Patient writes', sub: 'WhatsApp / Instagram / Website', time: null },
      { title: 'AI responds', sub: 'instantly, 24/7', time: '2 sec' },
      { title: 'Qualifies need', sub: 'service, date, time', time: '30 sec' },
      { title: 'Books appointment', sub: 'picks a convenient slot', time: '1 min' },
      { title: 'Booking confirmed', sub: 'patient receives confirmation', time: null },
    ],
    benefits: ['No receptionist involvement', 'Any time — even at 3 AM', 'Patient booked, not lost'],
  },

  howItWorks: {
    title: 'How it works',
    subtitle: 'Three steps — and your clinic never misses an inquiry again',
    steps: [
      { title: 'Connect your channels', body: 'Instagram, Telegram, WhatsApp, Viber, Facebook and your website chat — we connect everything for you. Takes 1 day.' },
      { title: 'Train on your clinic data', body: 'Upload your price list, schedule and service descriptions. The AI learns to respond exactly like your best receptionist.' },
      { title: 'Your clinic works 24/7', body: 'The AI responds to patients, books appointments, reschedules visits. You see all conversations in your dashboard.' },
    ],
  },

  integrations: {
    badge: 'Integrations',
    title: 'Works with your practice management system',
    subtitle: 'DentAI syncs with your clinic’s MIS/CRM — bookings land where you already work.',
    microcopy: 'Direct Synchronization. DentAI inputs reservations directly into your active medical calendar with zero manual data transfer or double-bookings.',
    groups: [
      { label: 'Czechia / EU', systems: ['XDENT', 'Dentem'] },
      { label: 'Ukraine / CIS', systems: ['DentalTap', 'ClinicIQ', 'Medods'] },
    ],
  },

  pdfAudit: {
    triggerCta: 'Download Personalized PDF Audit',
    modalTitle: 'Personalized PDF Revenue Audit',
    modalSubtitle: 'We’ll email a detailed breakdown of your clinic’s monthly losses.',
    nameLabel: 'Your name',
    namePlaceholder: 'John Smith',
    practiceLabel: 'Dental practice name',
    practicePlaceholder: 'Bright Smile Dental',
    emailLabel: 'Corporate email',
    emailPlaceholder: 'john@clinic.com',
    submit: 'Get my audit',
    submitting: 'Sending...',
    successTitle: 'Done!',
    successText: 'Your personalized audit is on its way to your inbox.',
    errorText: 'Something went wrong. Please try again.',
    close: 'Close',
  },

  dashboard: {
    title: 'One dashboard — full control',
    subtitle: 'All conversations, bookings and analytics — in one place.',
    nav: ['Conversations', 'Analytics', 'Knowledge base', 'Settings'],
    stats: [
      { label: 'Conversations today', value: '24', delta: '+6' },
      { label: 'New bookings', value: '11', delta: '+3' },
      { label: 'Handled by AI', value: '22', delta: '92%' },
      { label: 'Missed', value: '0', delta: '—' },
    ],
    dialogsTitle: 'Recent conversations',
    dialogsTime: 'today, 14:32',
    dialogs: [
      { name: 'Marina K.', preview: "I'd like to book a cleaning...", status: 'Booked' },
      { name: 'Andriy P.', preview: 'How much is an implant?', status: 'Answered' },
      { name: 'Olena V.', preview: 'Hi! I want to reschedule...', status: 'New' },
      { name: 'Dmytro L.', preview: 'Thanks, all clear!', status: 'Booked' },
      { name: 'Martin N.', preview: 'Dobrý den, mám dotaz na cenu...', status: 'Answered' },
    ],
    ctaTitle: 'Want to see it for your clinic?',
    ctaText: "We'll set up a demo with your services and prices.",
    ctaButton: 'Book a demo',
  },

  channels: {
    title: 'All the channels your patients use',
    subtitle: "Instagram, Telegram, WhatsApp, Viber, Facebook and your website chat — we connect them all.",
    names: ['Instagram', 'Facebook', 'Telegram', 'WhatsApp', 'Viber', 'Website'],
    ctaTitle: 'Your patients are already there.',
    ctaText: '67% of dental clinic inquiries come through messengers and social media — not the phone.',
    ctaButton: 'Connect your clinic',
  },

  demo: {
    badge: 'Try it right now',
    title: 'Live AI administrator demo',
    subtitle: 'This is the real AI — the same one you will install in your clinic. Write to it like a patient: ask about prices, book an appointment or reschedule a visit.',
    bullets: ['Responds in 2–3 seconds', 'Speaks Ukrainian, Czech, English', 'Suggests specific available slots', 'Understands complex dental terminology — implants, crowns, aligners, pediatric dentistry', 'Real-time triage: detects acute pain and instantly flags it to on-call staff', 'Never rude, never unavailable'],
  },

  scenarios: {
    title: 'Real use cases',
    subtitle: 'What the AI handles every day in your clinic',
    items: [
      { tag: 'Book a cleaning', patient: 'Hello! I would like to book a professional teeth cleaning. What slots do you have this week?', ai: 'Of course! The nearest available slots are tomorrow at 10:00 or Thursday at 14:30. Cleaning takes 45 min, €60. Which works better for you?' },
      { tag: 'Implant pricing', patient: "I'm interested in a dental implant. How much does it cost?", ai: 'An implant including crown starts from €800. The exact price depends on your clinical situation. Book a free consultation — the dentist will assess and give you a precise quote.' },
      { tag: 'Reschedule appointment', patient: 'I have an appointment on Friday at 3 PM. Can I move it to next week?', ai: "Of course! I've cancelled Friday at 3 PM. Next week we have Tuesday at 11:00 or Wednesday at 16:30. Which suits you?" },
      { tag: 'Late-night inquiry', patient: "Toothache, it's 11 PM. What should I do? Do you have emergency appointments?", ai: "I understand, that's very unpleasant. There's an urgent slot available tomorrow at 9:00. If the pain is severe — take a painkiller and call our emergency line: +XX XXX XXX XXX." },
    ],
  },

  results: {
    title: 'What your clinic gets',
    subtitle: 'Concrete results, not abstract promises',
    items: [
      { value: '+38%', label: 'more appointments per month' },
      { value: '< 3 sec', label: 'response time to patients' },
      { value: '0', label: 'missed patient inquiries' },
      { value: '24/7', label: 'no holidays, no sick days' },
    ],
  },

  testimonials: {
    title: 'What clinics say',
    subtitle: 'Real feedback from dental clinic owners',
    items: [
      { name: 'Olena Kovalenko', role: 'Clinic Owner', clinic: 'Perlyna Dental, Kyiv', text: 'In the first month we received 43 additional bookings that previously just disappeared after 7 PM. Our receptionist can finally focus on patients at the front desk instead of answering the same questions across 5 messengers simultaneously.', initials: 'OK' },
      { name: 'Jan N.', role: 'clinic owner', clinic: 'Prague (translated from Czech)', text: 'Our receptionists handled 80+ messages daily, and some were lost in the evening. After integrating DentAI, we stopped losing night leads for implants. The system paid for itself in the first week.', initials: 'JN' },
      { name: 'Iryna Petrenko', role: 'Network Director', clinic: 'SmilePlus — 3 clinics, Lviv', text: 'We started with one clinic. Within a week we connected all three. Patients are amazed to get a reply at 2 AM. Our Instagram conversion doubled in the first month.', initials: 'IP' },
    ],
  },

  pricing: {
    title: 'Simple pricing',
    subtitle: 'A receptionist costs €1,500–3,000/mo. We cost 10–30× less.',
    footnote: "Not sure which plan fits? Contact us — we'll figure it out together.",
    limitNote: '*What happens if the dialogue limit is reached before the end of the month? The bot will not turn off. The system will politely warn you, and the cost of each additional dialogue will be just €0.05, or you can upgrade your plan in one click.',
    plans: [
      { name: 'Starter', price: '€79', period: '/mo', desc: 'Single clinic', features: ['1 AI administrator', '2 channels (website + 1 messenger)', '500 conversations/mo', 'Appointment booking', 'Support 9–18'], highlight: false, cta: 'Book a demo', ctaHref: '/register', trialNote: '14 days free — no credit card' },
      { name: 'Clinic', price: '€179', period: '/mo', desc: 'Most popular', features: ['1 AI administrator', 'All 6 channels', '3,000 conversations/mo', 'Book, reschedule & cancel', 'Analytics & reports', '24/7 support'], highlight: true, cta: 'Book a demo', ctaHref: '/register', popularBadge: 'Most popular', trialNote: '14 days free — no credit card' },
      { name: 'Network', price: 'from €349', period: '/mo', desc: 'For clinic networks', features: ['Up to 5 clinics', 'All channels', 'Unlimited conversations', 'Dedicated account manager', 'Custom integrations', 'SLA'], highlight: false, cta: 'Contact us', ctaHref: '/contact' },
    ],
  },

  trust: [
    { title: 'GDPR-compliant', body: 'Patient data is stored on encrypted EU servers, fully compliant with healthcare regulations in Ukraine and the EU.' },
    { title: 'Your data is private', body: 'Your clinic data and patient information are never shared with third parties or used to train AI models.' },
    { title: 'Full control', body: 'You always see all conversations. You can step in, correct or change settings at any moment.' },
  ],

  faq: {
    title: 'Frequently asked questions',
    subtitle: 'Answers to questions dental clinic owners ask us most',
    items: [
      { q: 'Does the AI respond in Ukrainian and Czech?', a: "Yes. The AI automatically detects the patient's language and replies in Ukrainian, Czech, English, or any other major language. You can also set a default language for your clinic." },
      { q: 'How quickly is the setup done?', a: "Most clinics go live within 24 hours. Our team handles everything — you provide your clinic's info, services and prices, and we do the rest." },
      { q: 'Can the AI actually book appointments?', a: 'Yes. The AI integrates with your booking system and can independently schedule, reschedule or cancel appointments without staff involvement.' },
      { q: 'What happens if a patient has an urgent dental issue?', a: 'For emergencies, the AI immediately provides the on-call dentist number and clinic address. You configure escalation rules — for example, forwarding urgent messages to a staff member.' },
      { q: 'Is the system GDPR-compliant?', a: 'Yes. All patient data is stored on encrypted EU servers and processed in full compliance with GDPR. We never share medical data with third parties or use it for model training.' },
      { q: 'Which channels does it work with?', a: 'Website chat widget, Instagram Direct, Facebook Messenger, Telegram, WhatsApp and Viber — all managed from one dashboard. Patients write wherever they prefer, you see everything in one place.' },
      { q: 'Can I control what the AI says?', a: "Fully. You upload your knowledge base — services, prices, conditions, schedule. The AI only answers based on your information. If it doesn't know something, it politely refers the patient to your staff." },
      { q: 'How does the AI handle patient medical confidentiality?', a: 'All patient data is stored and processed on end-to-end encrypted EU data nodes. Access is strictly limited, data is never shared with third parties or used to train models — in full compliance with GDPR and medical regulations.' },
      { q: 'What happens if a patient types something in an invalid format?', a: 'The AI holds a natural conversation and auto-corrects — it reliably understands a phone number, date or service even when the formatting is off, and politely re-asks if needed. Patients never have to match a rigid template.' },
    ],
  },

  finalCta: {
    eyebrow: 'Ready to stop losing patients?',
    title: ['Book a free demo', 'for your clinic'],
    subtitle: 'A 15-minute call. We will show exactly how it looks for your clinic — connected to your channels, with your prices and schedule.',
    ctaPrimary: 'Book a free demo',
    ctaSecondary: 'Try the demo ↑',
    disclaimer: 'No credit card · Live in 24 hours · Cancel anytime',
  },

  footer: {
    tagline: 'AI administrator for dental clinics in Ukraine and Czech Republic.',
    howItWorks: 'How it works',
    demo: 'Demo',
    signIn: 'Sign in',
    bookDemo: 'Book a demo',
    email: 'hello@dentai.app',
    privacy: 'Privacy Policy',
    copyright: '© 2026 DentAI. All rights reserved.',
    badges: 'EU servers · GDPR-compliant · Medical data protected',
  },

  demoChat: {
    initial: "Hello! I'm the AI administrator for Ivory Dental Clinic. I can book your appointment and answer any questions about our services and prices. How can I help?",
    quickActions: [
      { label: 'Book appointment', message: "I'd like to book an appointment" },
      { label: 'See prices', message: 'What are your prices for services?' },
      { label: 'Reschedule', message: "I'd like to reschedule my appointment" },
    ],
    placeholder: 'Write a message...',
    online: 'replies instantly',
    error: 'Something went wrong. Please try again.',
    tooltip: 'Try the AI administrator',
  },
}
