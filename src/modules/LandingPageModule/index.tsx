import React from 'react'
import {
  AboutSection,
  ActivitySection,
  BranchSection,
  HeaderSection,
  JoinUsSection,
  ProgramSection,
  TestimonySection,
  WakafSection,
  WhySection,
} from './sections'
import { YouTubeSection } from './sections/YoutubeSection'
import { PartnerSection } from './sections/PartnerSection'

export const LandingPageModule: React.FC = async () => {
  return (
    <div className="flex flex-col gap-10 md:gap-20">
      <HeaderSection />
      <WhySection />
      <AboutSection />
      <ProgramSection />
      <WakafSection />
      <ActivitySection />
      <TestimonySection />
      <JoinUsSection />
      <BranchSection />
      <YouTubeSection />
      <PartnerSection />
    </div>
  )
}
