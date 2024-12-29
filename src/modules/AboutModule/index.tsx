import React from 'react'
import {
  AboutUsSection,
  DetailSection,
  HeaderSection,
  StructureSection,
} from './sections'

export const AboutModule: React.FC = async () => {
  return (
    <div className="flex flex-col gap-20">
      <HeaderSection />
      <AboutUsSection />
      <DetailSection />
      <StructureSection />
    </div>
  )
}
