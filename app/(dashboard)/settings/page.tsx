'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Bot, Save, Loader2, Trash2 } from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  system_prompt: string
  widget_color: string
}

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function SettingsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [editing, setEditing] = useState<Agent | null>(null)
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: '',
    description: '',
    system_prompt: 'You are an AI sales assistant. Help customers, answer their questions and guide them towards a purchase.',
    widget_color: '#6366f1',
  })

  useEffect(() => { loadAgents() }, [])

  async function loadAgents() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from('agents').select('*').eq('user_id', user!.id)
    setAgents(data || [])
  }

  async function createAgent() {
    if (!newAgent.name?.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('agents').insert({
      user_id: user!.id,
      name: newAgent.name,
      description: newAgent.description,
      system_prompt: newAgent.system_prompt,
      widget_color: newAgent.widget_color,
    })
    await loadAgents()
    setCreating(false)
    setNewAgent({ name: '', description: '', system_prompt: 'Ты — AI-ассистент по продажам. Помогай клиентам, отвечай на вопросы и направляй к покупке.', widget_color: '#6366f1' })
    setSaving(false)
  }

  async function saveAgent() {
    if (!editing) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('agents').update({
      name: editing.name,
      description: editing.description,
      system_prompt: editing.system_prompt,
      widget_color: editing.widget_color,
    }).eq('id', editing.id)
    await loadAgents()
    setEditing(null)
    setSaving(false)
  }

  async function deleteAgent(id: string) {
    const supabase = createClient()
    await supabase.from('agents').delete().eq('id', id)
    setAgents(a => a.filter(x => x.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  const form = editing || (creating ? newAgent : null)
  const setForm = editing
    ? (f: Partial<Agent>) => setEditing({ ...editing!, ...f })
    : (f: Partial<Agent>) => setNewAgent({ ...newAgent, ...f })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your agents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent list */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-slate-900 text-sm">Agents</span>
              <button
                onClick={() => { setCreating(true); setEditing(null) }}
                className="text-xs text-indigo-600 font-medium hover:underline"
              >
                + New
              </button>
            </div>
            {agents.length === 0 && !creating && (
              <div className="p-6 text-center">
                <p className="text-slate-400 text-sm">No agents yet</p>
              </div>
            )}
            <div className="divide-y divide-slate-100">
              {agents.map(agent => (
                <div
                  key={agent.id}
                  onClick={() => { setEditing(agent); setCreating(false) }}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${editing?.id === agent.id ? 'bg-indigo-50' : ''}`}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: agent.widget_color + '25' }}
                  >
                    <Bot className="w-4 h-4" style={{ color: agent.widget_color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 text-sm truncate">{agent.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit/create form */}
        {form && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-5">
                {creating ? 'New agent' : 'Edit agent'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Agent name</label>
                  <input
                    type="text"
                    value={form.name || ''}
                    onChange={e => setForm({ name: e.target.value })}
                    placeholder="e.g. Acme Corp Assistant"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                  <input
                    type="text"
                    value={form.description || ''}
                    onChange={e => setForm({ description: e.target.value })}
                    placeholder="Brief description of the company or agent's purpose"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">System prompt</label>
                  <textarea
                    value={form.system_prompt || ''}
                    onChange={e => setForm({ system_prompt: e.target.value })}
                    rows={4}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Widget color</label>
                  <div className="flex gap-2">
                    {COLORS.map(c => (
                      <button
                        key={c}
                        onClick={() => setForm({ widget_color: c })}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${form.widget_color === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={creating ? createAgent : saveAgent}
                    disabled={saving}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {creating ? 'Create' : 'Save'}
                  </button>
                  {editing && (
                    <button
                      onClick={() => deleteAgent(editing.id)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                  <button
                    onClick={() => { setEditing(null); setCreating(false) }}
                    className="text-slate-500 hover:text-slate-700 text-sm px-3 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
