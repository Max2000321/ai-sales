import Landing from '@/components/landing/Landing'
import { getDict } from '@/lib/i18n'

export default function CzPage() {
  return <Landing dict={getDict('cz')} />
}
