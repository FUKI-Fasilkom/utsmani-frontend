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
  const [responseProgram, responseActivity, responseBranch, responseTestimony] =
    await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/program/`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/activity/`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/branch/`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimony/`),
    ])
  const activities = await responseActivity.json()
  const programs = await responseProgram.json()
  const branches = await responseBranch.json()
  const testimonies = await responseTestimony.json()

  return (
    <div className="flex flex-col gap-10 md:gap-20">
      <HeaderSection />
      <WhySection />
      <AboutSection />
      <ProgramSection programs={programs.contents} />
      <WakafSection />
      <ActivitySection activities={activities.contents} />
      <TestimonySection testimonies={testimonies.contents} />
      <JoinUsSection />
      <BranchSection branches={branches.contents} />
      <YouTubeSection />
    </div>
  )
}
