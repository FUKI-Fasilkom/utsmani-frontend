import React from 'react'
import { CategorySection, DonationListSection, HeroSection } from './sections'

export const DonationModule: React.FC = async () => {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />
      <CategorySection />
      <DonationListSection />
    </main>
  )
}
