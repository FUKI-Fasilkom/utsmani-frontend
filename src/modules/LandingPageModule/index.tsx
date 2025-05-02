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

export const LandingPageModule: React.FC = async () => {
  const [responseProgram, responseActivity, responseBranch] = await Promise.all(
    [
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/program`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/activity`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/branch`),
    ]
  )
  const activities = await responseActivity.json()
  const programs = await responseProgram.json()
  const branches = await responseBranch.json()

  return (
    <div className="flex flex-col gap-10 md:gap-20">
      <HeaderSection />
      <WhySection />
      <AboutSection />
      <ProgramSection branchPrograms={programs.contents} />
      <WakafSection />
      <ActivitySection activities={activities.contents} />
      <TestimonySection />
      <JoinUsSection />
      <BranchSection branches={branches.contents} />
      <YouTubeSection />
    </div>
  )
}
