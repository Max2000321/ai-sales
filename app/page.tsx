import Link from 'next/link'
import { Bot, Zap, Shield, BarChart3, MessageSquare, Upload, Star } from 'lucide-react'
import DemoChat from '@/components/landing/DemoChat'
import AnimateOnScroll from '@/components/landing/AnimateOnScroll'
import FaqSection from '@/components/landing/FaqSection'

const TESTIMONIALS = [
  {
    name: 'Anna Müller',
    role: 'Head of Sales',
    company: 'ShopDirect GmbH',
    text: 'We set it up in 20 minutes. Now our AI handles 80% of pre-sale questions automatically. Our team finally has time to focus on closing deals.',
    initials: 'AM',
    color: '#6366f1',
  },
  {
    name: 'Carlos Reyes',
    role: 'Founder',
    company: 'Clinica Moderna',
    text: 'Patients ask about appointments, prices and services 24/7. Before SalesAI we missed dozens of inquiries every week. Now zero.',
    initials: 'CR',
    color: '#0ea5e9',
  },
  {
    name: 'Sophie Leblanc',
    role: 'E-commerce Manager',
    company: 'MaisonStyle',
    text: 'The embed was one line of code. The AI speaks both French and English to our customers. Conversion rate went up 18% in the first month.',
    initials: 'SL',
    color: '#10b981',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100 px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900 text-lg">SalesAI</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#demo" className="text-slate-600 hover:text-slate-900 text-sm font-medium hidden sm:block">
              Live demo
            </a>
            <Link href="/login" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <AnimateOnScroll>
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            AI Sales Employee
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            Your best sales rep works<br className="hidden md:block" />
            <span className="text-indigo-600"> 24/7 and costs €49/mo</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Connect your knowledge base in 10 minutes. AI handles the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-base"
            >
              Create your agent — free
            </Link>
            <a
              href="#demo"
              className="w-full sm:w-auto border border-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors text-base text-center"
            >
              See live demo ↓
            </a>
          </div>
          <p className="text-sm text-slate-500 mb-12">
            ⭐⭐⭐⭐⭐ Trusted by 50+ businesses across Europe
          </p>
        </AnimateOnScroll>

        {/* Live demo chat */}
        <AnimateOnScroll delay={200}>
          <div id="demo" className="max-w-sm mx-auto">
            <p className="text-sm text-slate-500 mb-3 font-medium">Try the live demo below ↓</p>
            <DemoChat />
            <p className="text-xs text-slate-400 mt-3">Powered by Advanced AI · No sign-up required</p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Up and running in 10 minutes</h2>
            <p className="text-slate-600 text-center mb-12">Three steps to a working AI agent</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                icon: Upload,
                title: 'Upload your knowledge base',
                desc: 'Upload documents, add FAQs or paste your website URL. The AI will learn about your company.',
              },
              {
                step: '2',
                icon: Bot,
                title: 'Configure your agent',
                desc: 'Give it a name, set the tone and choose a widget color that matches your brand.',
              },
              {
                step: '3',
                icon: MessageSquare,
                title: 'Embed on your website',
                desc: 'Copy one line of code and the chat widget appears on your site instantly.',
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <AnimateOnScroll key={step} delay={i * 120}>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 h-full">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-xs font-semibold text-indigo-600 mb-2">STEP {step}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Everything you need</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Bot, title: 'Powered by Advanced AI', desc: 'The most capable AI technology for accurate, helpful answers every time.' },
              { icon: Shield, title: 'Your data stays private', desc: 'Documents are stored only in your account, never shared.' },
              { icon: BarChart3, title: 'Conversation analytics', desc: 'See what customers ask about and improve your knowledge base.' },
              { icon: MessageSquare, title: 'Full conversation history', desc: 'Every customer chat in one place, searchable and organized.' },
              { icon: Zap, title: 'Instant responses', desc: 'Answers in seconds — no waiting for a sales rep to be available.' },
              { icon: Upload, title: 'PDF, TXT, FAQ support', desc: 'Upload any document format to build your knowledge base.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <AnimateOnScroll key={title} delay={i * 80}>
                <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 cursor-default">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                    <p className="text-slate-600 text-sm">{desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">What our customers say</h2>
            <p className="text-slate-600 text-center mb-12">Real businesses, real results</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 120}>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400" />)}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Simple pricing</h2>
            <p className="text-slate-600 text-center mb-12">A sales rep costs €3,000+/mo. We are 10× cheaper.</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: '€49',
                features: ['1 agent', '500 messages/mo', '5 documents', 'Website widget'],
                highlight: false,
              },
              {
                name: 'Pro',
                price: '€149',
                features: ['3 agents', '5,000 messages/mo', 'Unlimited documents', 'Conversation history', 'Analytics'],
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['No limits', 'Priority support', 'Custom domain', 'SLA'],
                highlight: false,
              },
            ].map(({ name, price, features, highlight }, i) => (
              <AnimateOnScroll key={name} delay={i * 120}>
                <div
                  className={`rounded-2xl p-6 border h-full flex flex-col ${highlight ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200'}`}
                >
                  {highlight && (
                    <div className="text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full w-fit mb-3">
                      Most popular
                    </div>
                  )}
                  <div className={`text-sm font-semibold mb-1 ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{name}</div>
                  <div className={`text-3xl font-bold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</div>
                  <div className={`text-sm mb-6 ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>per month</div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {features.map(f => (
                      <li key={f} className={`text-sm flex items-center gap-2 ${highlight ? 'text-indigo-100' : 'text-slate-600'}`}>
                        <span className={highlight ? 'text-indigo-300' : 'text-indigo-500'}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      highlight
                        ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    Get started
                  </Link>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Frequently asked questions</h2>
            <p className="text-slate-600 text-center mb-10">Everything you need to know before getting started</p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <FaqSection />
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to try it?</h2>
            <p className="text-slate-600 mb-8">Create your first agent for free. No credit card required.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-base text-center"
              >
                Create your agent →
              </Link>
              <a
                href="#demo"
                className="w-full sm:w-auto inline-block border border-slate-200 text-slate-700 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors text-base text-center"
              >
                See live demo
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900">SalesAI</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span>contact@salesai.app</span>
              <span>Europe, EU</span>
              <a href="#demo" className="hover:text-slate-900">Live demo</a>
              <Link href="/login" className="hover:text-slate-900">Sign in</Link>
              <Link href="/register" className="hover:text-slate-900">Get started</Link>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 text-center text-sm text-slate-400">
            © 2026 SalesAI. All rights reserved. · Powered by Advanced AI
          </div>
        </div>
      </footer>
    </div>
  )
}
