import Link from 'next/link'
import { Bot, Zap, Shield, BarChart3, MessageSquare, Upload } from 'lucide-react'
import DemoChat from '@/components/landing/DemoChat'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900 text-lg">SalesAI</span>
          </div>
          <div className="flex items-center gap-4">
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
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
          <Zap className="w-3.5 h-3.5" />
          AI Sales Employee
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Answer customer inquiries<br />
          <span className="text-indigo-600">without a sales rep</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Connect your website, documents and FAQ. AI answers customer questions 24/7 using your knowledge base.
        </p>
        <div className="flex items-center justify-center gap-4 mb-16">
          <Link
            href="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-base"
          >
            Create your agent — free
          </Link>
          <Link
            href="#how"
            className="text-slate-600 hover:text-slate-900 font-medium text-base flex items-center gap-2"
          >
            How it works →
          </Link>
        </div>

        {/* Live demo chat */}
        <div className="max-w-sm mx-auto">
          <p className="text-sm text-slate-500 mb-3 font-medium">Try the live demo below ↓</p>
          <DemoChat />
          <p className="text-xs text-slate-400 mt-3">Powered by Advanced AI · No sign-up required</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Up and running in 10 minutes</h2>
          <p className="text-slate-600 text-center mb-12">Three steps to a working AI agent</p>
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
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-xs font-semibold text-indigo-600 mb-2">STEP {step}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Everything you need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Bot, title: 'Powered by Advanced AI', desc: 'The most capable AI technology for accurate, helpful answers every time.' },
              { icon: Shield, title: 'Your data stays private', desc: 'Documents are stored only in your account, never shared.' },
              { icon: BarChart3, title: 'Conversation analytics', desc: 'See what customers ask about and improve your knowledge base.' },
              { icon: MessageSquare, title: 'Full conversation history', desc: 'Every customer chat in one place, searchable and organized.' },
              { icon: Zap, title: 'Instant responses', desc: 'Answers in seconds — no waiting for a sales rep to be available.' },
              { icon: Upload, title: 'PDF, TXT, FAQ support', desc: 'Upload any document format to build your knowledge base.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Simple pricing</h2>
          <p className="text-slate-600 text-center mb-12">A sales rep costs €3,000+/mo. We are 10× cheaper.</p>
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
            ].map(({ name, price, features, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-6 border ${highlight ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200'}`}
              >
                <div className={`text-sm font-semibold mb-1 ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{name}</div>
                <div className={`text-3xl font-bold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</div>
                <div className={`text-sm mb-6 ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>per month</div>
                <ul className="space-y-2 mb-6">
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to try it?</h2>
          <p className="text-slate-600 mb-8">Create your first agent for free. No credit card required.</p>
          <Link
            href="/register"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-base"
          >
            Create your agent →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900">SalesAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>contact@salesai.app</span>
              <span>Europe, EU</span>
              <Link href="/login" className="hover:text-slate-900">Sign in</Link>
              <Link href="/register" className="hover:text-slate-900">Get started</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-sm text-slate-400">
            © 2026 SalesAI. All rights reserved. · Powered by Advanced AI
          </div>
        </div>
      </footer>
    </div>
  )
}
