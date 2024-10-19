import React from 'react'
import {
  HeaderSection,
  AboutSection,
  DetailSection,
  StructureSection,
} from './sections'

export const AboutModule: React.FC = async () => {
  return (
    <>
      <HeaderSection />
      <AboutSection />
      <DetailSection />
      <StructureSection />
    </>
  )
}
