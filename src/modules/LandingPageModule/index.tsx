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
    <>
      <HeaderSection />
      <WhySection />
      <AboutSection />
      <ProgramSection />
      <WakafSection />
      <ActivitySection />
      <TestimonySection />
      <JoinUsSection />
      <BranchSection />
    </>
  )
}
