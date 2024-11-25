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

export const LandingPageModule: React.FC = async () => {
  return (
    <div className="flex flex-col gap-20">
      <HeaderSection />
      <WhySection />
      <AboutSection />
      <ProgramSection />
      <WakafSection />
      <ActivitySection />
      <TestimonySection />
      <JoinUsSection />
      <BranchSection />
    </div>
  )
}
