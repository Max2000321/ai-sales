import Landing from '@/components/landing/Landing'
import { getDict } from '@/lib/i18n'

export default function EnPage() {
  return <Landing dict={getDict('en')} />
}
