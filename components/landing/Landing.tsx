import Nav from './Nav'
import Hero from './Hero'
import StatsBar from './StatsBar'
import Problem from './Problem'
import LostSection from './LostSection'
import Flow from './Flow'
import HowItWorks from './HowItWorks'
import DashboardPreview from './DashboardPreview'
import Channels from './Channels'
import Integrations from './Integrations'
import Demo from './Demo'
import Scenarios from './Scenarios'
import Results from './Results'
import Testimonials from './Testimonials'
import Pricing from './Pricing'
import Trust from './Trust'
import Faq from './Faq'
import FinalCta from './FinalCta'
import Footer from './Footer'
import FloatingChat from './FloatingChat'
import type { LandingDict } from '@/lib/i18n/types'

interface Props {
  dict: LandingDict
}

export default function Landing({ dict }: Props) {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Nav dict={dict.nav} locale={dict.locale} />
      <Hero dict={dict.hero} />
      <StatsBar stats={dict.stats} />
      <Problem dict={dict.problem} />
      <LostSection dict={dict.lostTimeline} calculator={dict.calculator} currency={dict.currency} audit={dict.pdfAudit} locale={dict.locale} />
      <Flow dict={dict.flow} />
      <HowItWorks dict={dict.howItWorks} />
      <DashboardPreview dict={dict.dashboard} />
      <Channels dict={dict.channels} />
      <Integrations dict={dict.integrations} />
      <Demo dict={dict.demo} chatDict={dict.demoChat} locale={dict.locale} />
      <Scenarios dict={dict.scenarios} />
      <Results dict={dict.results} />
      <Testimonials dict={dict.testimonials} />
      <Pricing dict={dict.pricing} />
      <Trust items={dict.trust} />
      <Faq dict={dict.faq} />
      <FinalCta dict={dict.finalCta} />
      <Footer dict={dict.footer} />
      <FloatingChat dict={dict.demoChat} locale={dict.locale} />
    </div>
  )
}
