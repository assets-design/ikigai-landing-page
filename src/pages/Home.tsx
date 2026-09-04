import { useState } from 'react'
import Header from '@/components/layout/Header'
import MobileStickyBar from '@/components/layout/MobileStickyBar'
import Appointment from '@/components/sections/Appointment'
import CtaBand from '@/components/sections/CtaBand'
import Faqs from '@/components/sections/Faqs'
import Locations from '@/components/sections/Locations'
import PatientStories from '@/components/sections/PatientStories'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import SocialMedia from '@/components/sections/SocialMedia'
import Specialists from '@/components/sections/Specialists'
import Stats from '@/components/sections/Stats'
import WhyIkigai from '@/components/sections/WhyIkigai'
import AppointmentPopup from '@/components/ui/AppointmentPopup'

const mobileStickyBarPadding =
  'pb-[calc(max(clamp(12px,1.56vw,30px),env(safe-area-inset-bottom,0px))+clamp(56px,4.375vw,84px)+clamp(12px,1.56vw,30px))]'

export default function Home() {
  const [isStickyBarHidden, setIsStickyBarHidden] = useState(false)

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main
        className={`${isStickyBarHidden ? 'pb-0' : mobileStickyBarPadding} sm:pb-0`}
      >
        <Hero />
        <Stats />
        <Services />
        <Specialists />
        <CtaBand />
        <WhyIkigai />
        <SocialMedia />
        <PatientStories />
        <Faqs />
        <Locations />
        <Appointment stickyBarHidden={isStickyBarHidden} />
      </main>
      <AppointmentPopup />
      <MobileStickyBar onHiddenChange={setIsStickyBarHidden} />
    </div>
  )
}
