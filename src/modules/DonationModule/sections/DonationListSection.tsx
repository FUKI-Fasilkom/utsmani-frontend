import React from 'react'
import { DUMMY_DONATION_LIST } from '../constant'
import { DonationCard } from '../module-elements'

export const DonationListSection = () => {
  return (
    <section className="bg-cream-1 lg:py-[28px]">
      <div className="container flex flex-wrap">
        {DUMMY_DONATION_LIST.map((donation) => (
          <div key={donation.id} className="w-1/2 md:w-1/3 p-2 lg:p-4">
            <DonationCard donation={donation} />
          </div>
        ))}
      </div>
    </section>
  )
}
