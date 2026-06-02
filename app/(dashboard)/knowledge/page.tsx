'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { Upload, Trash2, BookOpen, FileText, Loader2 } from 'lucide-react'

interface Agent { id: string; name: string }
interface Chunk { id: string; source_name: string; content: string; created_at: string }

export default function KnowledgePage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<string>('')
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [faqText, setFaqText] = useState('')
  const [sourceName, setSourceName] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadAgents()
  }, [])

  useEffect(() => {
    if (selectedAgent) loadChunks()
  }, [selectedAgent])

  async function loadAgents() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from('agents').select('id, name').eq('user_id', user!.id)
    setAgents(data || [])
    if (data?.[0]) setSelectedAgent(data[0].id)
  }

  async function loadChunks() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('knowledge_chunks')
      .select('*')
      .eq('agent_id', selectedAgent)
      .order('created_at', { ascending: false })
    setChunks(data || [])
    setLoading(false)
  }

  async function uploadText() {
    if (!faqText.trim() || !sourceName.trim() || !selectedAgent) return
    setUploading(true)

    const res = await fetch('/api/knowledge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId: selectedAgent, text: faqText, sourceName }),
    })

    if (res.ok) {
      setFaqText('')
      setSourceName('')
      await loadChunks()
    }
    setUploading(false)
  }

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !selectedAgent) return
    setUploading(true)

    const text = await file.text()
    const res = await fetch('/api/knowledge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId: selectedAgent, text, sourceName: file.name }),
    })

    if (res.ok) await loadChunks()
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function deleteChunk(id: string) {
    const supabase = createClient()
    await supabase.from('knowledge_chunks').delete().eq('id', id)
    setChunks(c => c.filter(x => x.id !== id))
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Knowledge base</h1>
        <p className="text-slate-500 text-sm">Documents, FAQs and text the agent uses to answer questions</p>
      </div>

      {/* Agent selector */}
      {agents.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Agent</label>
          <select
            value={selectedAgent}
            onChange={e => setSelectedAgent(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
      )}

      {agents.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 mb-6">
          First create an agent in Settings
        </div>
      )}

      {selectedAgent && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload form */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Upload className="w-4 h-4 text-indigo-500" />
                Add text / FAQ
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Source name (e.g. FAQ, Price list)"
                  value={sourceName}
                  onChange={e => setSourceName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  placeholder="Paste text, FAQ or product descriptions..."
                  value={faqText}
                  onChange={e => setFaqText(e.target.value)}
                  rows={6}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <button
                  onClick={uploadText}
                  disabled={uploading || !faqText.trim() || !sourceName.trim()}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Add to knowledge base
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Upload file (.txt)
              </h2>
              <input
                ref={fileRef}
                type="file"
                accept=".txt,.md"
                onChange={uploadFile}
                disabled={uploading}
                className="w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:text-sm file:font-medium hover:file:bg-indigo-100 cursor-pointer disabled:opacity-50"
              />
              <p className="text-xs text-slate-400 mt-2">Supports .txt and .md files</p>
            </div>
          </div>

          {/* Chunks list */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                Sources ({chunks.length})
              </h2>
            </div>
            <div className="overflow-auto max-h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center p-10">
                  <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                </div>
              ) : chunks.length === 0 ? (
                <div className="p-10 text-center">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Knowledge base is empty</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {chunks.map(chunk => (
                    <div key={chunk.id} className="px-5 py-3 group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {chunk.source_name}
                        </span>
                        <button
                          onClick={() => deleteChunk(chunk.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">{chunk.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
