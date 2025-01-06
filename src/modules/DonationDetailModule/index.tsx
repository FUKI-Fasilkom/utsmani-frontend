import React from 'react'
import { HeroSection } from '../DonationModule/sections'
import {
  ContactPersonSection,
  DescriptionSection,
  SideSection,
  DonationCarouselSection,
  DonorSection,
} from './sections'
import { DUMMY_DONATION_LIST } from '../DonationModule/constant'
import { Donation } from '../DonationModule/interface'

export const DonationDetailModule: React.FC<{ id: string }> = async ({
  id,
}) => {
  const donation: Donation = DUMMY_DONATION_LIST.find(
    (donation) => donation.id === id
  ) as Donation
  return (
    <>
      <HeroSection banner={donation.banner.url} />
      <main className="container py-10 flex flex-col lg:flex-row">
        <SideSection donation={donation} />
        <section className="flex flex-col px-2 lg:px-[72px] gap-y-9 mt-10">
          <DescriptionSection description={donation.description} />
          <DonationCarouselSection />
          <DonorSection id={id} />
          <ContactPersonSection
            name={donation.cp_name}
            detail={donation.cp_detail}
            wa_number={donation.cp_wa_number}
            email={donation.cp_email}
          />
        </section>
      </main>
    </>
  )
}
