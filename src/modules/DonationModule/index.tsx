import React from 'react'
import { CategorySection, DonationListSection, HeroSection } from './sections'

export const DonationModule: React.FC = async () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <DonationListSection />
    </>
  )
}
