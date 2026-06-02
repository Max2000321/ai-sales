import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import ChatInterface from '@/components/chat/ChatInterface'

interface Props {
  params: Promise<{ agentId: string }>
}

export default async function ChatPage({ params }: Props) {
  const { agentId } = await params
  const supabase = await createServerSupabaseClient()

  const { data: agent } = await supabase
    .from('agents')
    .select('id, name, description, widget_color, system_prompt')
    .eq('id', agentId)
    .single()

  if (!agent) notFound()

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <ChatInterface agent={agent} />
    </div>
  )
}
