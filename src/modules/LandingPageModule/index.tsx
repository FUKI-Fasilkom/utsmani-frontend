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
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/program`)
  // const responseJson = await response.json()

  //   console.log(responseJson)
  return (
    <div className="flex flex-col gap-20">
      <HeaderSection />
      <WhySection />
      <AboutSection />
      {/* <ProgramSection programs={responseJson.contents} /> */}
      <WakafSection />
      <ActivitySection />
      <TestimonySection />
      <JoinUsSection />
      <BranchSection />
    </div>
  )
}
