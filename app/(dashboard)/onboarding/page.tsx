import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import OnboardingWizard from '@/components/onboarding/OnboardingWizard'

export default async function OnboardingPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // If user already has agents — skip onboarding
  const { data: agents } = await supabase
    .from('agents')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)

  if (agents && agents.length > 0) redirect('/dashboard')

  return <OnboardingWizard />
}
