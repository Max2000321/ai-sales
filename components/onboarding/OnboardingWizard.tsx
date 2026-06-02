'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Bot, BookOpen, Rocket, Check, Loader2, Copy, ExternalLink } from 'lucide-react'

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

const STEPS = [
  { id: 1, icon: Bot, label: 'Create agent' },
  { id: 2, icon: BookOpen, label: 'Add knowledge' },
  { id: 3, icon: Rocket, label: 'Go live' },
]

export default function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Step 1
  const [agentName, setAgentName] = useState('')
  const [agentColor, setAgentColor] = useState('#6366f1')
  const [agentId, setAgentId] = useState<string | null>(null)

  // Step 2
  const [faqText, setFaqText] = useState('')
  const [skippedKnowledge, setSkippedKnowledge] = useState(false)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ai-sales.vercel.app'
  const chatUrl = agentId ? `${appUrl}/chat/${agentId}` : ''

  async function createAgent() {
    if (!agentName.trim()) return
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from('agents').insert({
      user_id: user!.id,
      name: agentName,
      description: '',
      system_prompt: `You are ${agentName}, an AI sales assistant. Help customers with their questions, provide accurate information and guide them towards a purchase. Be friendly and concise.`,
      widget_color: agentColor,
    }).select('id').single()
    setAgentId(data?.id || null)
    setLoading(false)
    setStep(2)
  }

  async function saveKnowledge() {
    if (!faqText.trim() || !agentId) {
      setSkippedKnowledge(true)
      setStep(3)
      return
    }
    setLoading(true)
    await fetch('/api/knowledge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId, text: faqText, sourceName: 'FAQ' }),
    })
    setLoading(false)
    setStep(3)
  }

  async function copyLink() {
    await navigator.clipboard.writeText(chatUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      {/* Progress */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step > s.id
                      ? 'bg-indigo-600 text-white'
                      : step === s.id
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                      : 'bg-white border-2 border-slate-200 text-slate-400'
                  }`}
                >
                  {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-medium ${step >= s.id ? 'text-indigo-700' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 ${step > s.id ? 'bg-indigo-600' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

        {/* Step 1 — Create agent */}
        {step === 1 && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Create your first agent</h1>
              <p className="text-slate-500 text-sm">Give it a name and pick a color. Takes 30 seconds.</p>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Agent name</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={e => setAgentName(e.target.value)}
                  placeholder="e.g. Acme Support, Sales Bot, Help Desk..."
                  autoFocus
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Widget color</label>
                <div className="flex gap-3">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setAgentColor(c)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${agentColor === c ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Preview */}
              {agentName && (
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50">
                  <p className="text-xs text-slate-400 mb-2 font-medium">Preview</p>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl w-fit" style={{ backgroundColor: agentColor }}>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">{agentName}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <span className="text-white/80 text-xs">Online</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={createAgent}
                disabled={loading || !agentName.trim()}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Continue →
              </button>
            </div>
          </>
        )}

        {/* Step 2 — Knowledge */}
        {step === 2 && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Add your knowledge base</h1>
              <p className="text-slate-500 text-sm">Paste your FAQ, product info or pricing. The AI will use this to answer customers.</p>
            </div>
            <div className="space-y-4">
              <textarea
                value={faqText}
                onChange={e => setFaqText(e.target.value)}
                placeholder={`Example:\n\nQ: What are your prices?\nA: We offer 3 plans starting from €49/mo.\n\nQ: How fast is delivery?\nA: We ship within 24 hours across Europe.\n\nQ: Do you offer a free trial?\nA: Yes, 14 days free, no credit card needed.`}
                rows={8}
                autoFocus
                className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
              <button
                onClick={saveKnowledge}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {faqText.trim() ? 'Save & continue →' : 'Skip for now →'}
              </button>
            </div>
          </>
        )}

        {/* Step 3 — Go live */}
        {step === 3 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Your agent is live! 🎉</h1>
              <p className="text-slate-500 text-sm">Share the link or embed it on your website.</p>
            </div>

            <div className="space-y-4">
              {/* Share link */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Share link</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-700 truncate flex-1 font-mono">{chatUrl}</p>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-1.5 text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Test it */}
              <a
                href={chatUrl}
                target="_blank"
                className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Test your agent
              </a>

              {/* Go to dashboard */}
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Go to Dashboard →
              </button>

              {skippedKnowledge && (
                <p className="text-xs text-amber-600 text-center bg-amber-50 rounded-lg px-3 py-2">
                  You skipped the knowledge base — add it later in the Knowledge section for better answers.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {step < 3 && (
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          Skip setup — go to dashboard
        </button>
      )}
    </div>
  )
}
