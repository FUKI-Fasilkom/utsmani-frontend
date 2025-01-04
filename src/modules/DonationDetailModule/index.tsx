import React from 'react'
import { HeroSection } from '../DonationModule/sections'
import {
  ContactPersonSection,
  DetailSection,
  DonationCarouselSection,
  DonorSection,
} from './sections'
import { DONOR_LIST } from './constant'

export const DonationDetailModule: React.FC = async () => {
  return (
    <>
      <HeroSection />
      <main className="container py-10 flex ">
        <DetailSection />
        <section className="grow flex flex-col px-[72px] gap-y-9">
          <DonationCarouselSection />
          <DonorSection donors={DONOR_LIST} />
          <ContactPersonSection
            name={'Dr. Abdullah Rasyid S.Kom.'}
            detail={'Pendiri Pesantren Tahfizh Al-Qur’an'}
            wa_number={'+6285686861111'}
            email={'abdullahrasyid@gmail.com'}
          />
        </section>
      </main>
    </>
  )
}
