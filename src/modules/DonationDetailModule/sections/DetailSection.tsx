'use client'
import { Progress } from '@/components/ui/progress'
import { DUMMY_DONATION_LIST } from '@/modules/DonationModule/constant'
import { Donation } from '@/modules/DonationModule/interface'
import React from 'react'
import CountdownTimer from '../module-elements/Countdown'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const DetailSection = () => {
  const [donation, setDonation] = React.useState<Donation>(
    DUMMY_DONATION_LIST[0]
  )

  const getPercentageAmount = (donation: Donation) => {
    return (donation.current_amount / donation.target_amount) * 100
  }

  return (
    <aside>
      <span>{donation.category}</span>
      <h1>{donation.title}</h1>

      <div>
        <span>Donasi Terkumpul</span>
        <span>Rp{donation.current_amount}</span>
        <Progress value={getPercentageAmount(donation)} />
        <div>
          <span>
            <span>{donation.donor_count}</span> Donatur
          </span>
          <span>{getPercentageAmount(donation)}%</span>
        </div>
      </div>

      <CountdownTimer days={0} hours={0} minutes={0} />

      <p>{donation.description}</p>

      <nav>
        <Button>Donasi Sekarang</Button>
        <Button>Narahubung</Button>
        <Button>Bagikan</Button>
      </nav>
    </aside>
  )
}
