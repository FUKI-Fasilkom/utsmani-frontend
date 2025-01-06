import { Progress } from '@/components/ui/progress'
import { Donation } from '@/modules/DonationModule/interface'
import React from 'react'
import CountdownTimer from '../module-elements/Countdown'
import { convertToRupiah } from '../utils/currency'
import { WrapperCard } from '../module-elements'
import { getDuration } from '../utils'
import { CTAButtons } from '../module-elements/CTAButtons.tsx'

interface SideSectionProps {
  donation: Donation
}

export const SideSection: React.FC<SideSectionProps> = ({ donation }) => {
  const duration = {
    days: getDuration(donation.deadline, 'hari', true),
    hours: getDuration(donation.deadline, 'jam', false),
    minutes: getDuration(donation.deadline, 'menit', false),
  }

  const getPercentageAmount = (donation: Donation) => {
    return (donation.current_amount / donation.target_amount) * 100
  }

  return (
    <WrapperCard className="lg:sticky lg:top-4 h-min w-full lg:w-5/12 shrink-0 flex flex-col gap-y-2">
      <span className="text-brown text-base md:text-lg lg:text-xl font-semibold">
        {donation.category}
      </span>
      <h1 className="text-brown text-3xl md:text-4xl lg:text-[40px] font-semibold">
        {donation.title}
      </h1>

      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-[6px] text-sm md:text-base">
          <span>Donasi Terkumpul</span>
          <span className="text-brown text-xl nd:text-2xl lg:text-3xl font-bold">
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
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Waktu Donasi tersisa
          </h1>
          <CountdownTimer {...duration} />
        </div>
        {/* CTA Buttons */}
        <CTAButtons />
      </div>
    </WrapperCard>
  )
}

SideSection.displayName = 'SideSection'

export default SideSection
