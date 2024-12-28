import React from 'react'
import { HeroSection } from '../DonationModule/sections'
import { DetailSection } from './sections'

export const DonationDetailModule: React.FC = async () => {
  return (
    <>
      <HeroSection />
      <main>
        <DetailSection />
      </main>
    </>
  )
}
