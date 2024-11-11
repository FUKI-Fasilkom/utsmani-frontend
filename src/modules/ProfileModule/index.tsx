import React from 'react'
import { HeaderSection } from './sections/HeaderSection'
import { DetailSection } from './sections/DetailSection'
import { AboutUsSection } from './sections/AboutUsSection'
import { StructureSection } from './sections/StructureSection'

export const ProfileModule: React.FC = async () => {
  return (
    <>
      <HeaderSection />
      <AboutUsSection />
      <DetailSection />
      <StructureSection />
    </>
  )
}
