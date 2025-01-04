'use client'
import { Progress } from '@/components/ui/progress'
import { DUMMY_DONATION_LIST } from '@/modules/DonationModule/constant'
import { Donation } from '@/modules/DonationModule/interface'
import React from 'react'
import CountdownTimer from '../module-elements/Countdown'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { convertToRupiah } from '../utils/currency'

export const DetailSection = () => {
  const [donation, _] = React.useState<Donation>(DUMMY_DONATION_LIST[0])

  const getPercentageAmount = (donation: Donation) => {
    return (donation.current_amount / donation.target_amount) * 100
  }

  return (
    <aside className="sticky top-4 h-min w-5/12 bg-white shadow-xl py-12 px-10 flex flex-col gap-y-5 rounded-[32px]">
      <span className="text-brown text-2xl font-semibold">
        {donation.category}
      </span>
      <h1 className="text-brown text-5xl font-semibold">{donation.title}</h1>

      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-[6px]">
          <span>Donasi Terkumpul</span>
          <span className="text-brown text-[32px] font-bold">
            {convertToRupiah(donation.current_amount)}
          </span>
          <Progress value={getPercentageAmount(donation)} className="h-2" />
          <div className="flex justify-between text-brown">
            <span>
              <span className="font-bold">{donation.donor_count}</span> Donatur
            </span>
            <span className="font-bold">
              {getPercentageAmount(donation).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 text-brown">
          <h1 className="text-2xl font-semibold">Waktu Donasi tersisa</h1>
          <CountdownTimer days={125} hours={10} minutes={49} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: donation.description }} />
      </div>

      <Button className="text-lg h-12" variant={'secondary'}>
        Donasi Sekarang
      </Button>
      <Button className="text-lg h-12" variant={'tertiary'}>
        Narahubung
      </Button>
      <button className="group flex text-brown self-center items-center gap-x-2">
        <Share2 className="rotate-180 fill-brown w-5 h-5" />
        <span className="group-hover:underline">Bagikan</span>
      </button>
    </aside>
  )
}

export default DetailSection
