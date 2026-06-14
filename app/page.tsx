import Landing from '@/components/landing/Landing'
import { getDict } from '@/lib/i18n'

export default function LandingPage() {
  return <Landing dict={getDict('uk')} />
}
