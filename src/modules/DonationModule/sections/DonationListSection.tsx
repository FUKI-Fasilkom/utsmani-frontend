import React from 'react'
import { DUMMY_DONATION_LIST } from '../constant'
import { DonationCard } from '../module-elements'

export const DonationListSection = () => {
  return (
    <section className="bg-cream-1 flex flex-wrap px-[148px] py-[28px]">
      {DUMMY_DONATION_LIST.map((donation) => (
        <div key={donation.id} className="w-1/3 p-4">
          <DonationCard donation={donation} />
        </div>
      ))}
    </section>
  )
}
