import Link from 'next/link'
import React from 'react'
import { Donation } from '../interface'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

interface DonationCardProps {
  donation: Donation
}

export const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  const getRemainingDays = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const percentageAmount =
    (donation.current_amount / donation.target_amount) * 100

  return (
    <Link
      href={`/donation/${donation.id}`}
      className="block bg-white rounded-2xl p-3 drop-shadow-lg"
    >
      <Image
        src={donation.image_url}
        height={200}
        width={360}
        alt={donation.title}
      />
      <div className="flex flex-col gap-y-1">
        <span className="text-brown/80 font-semibold ">
          {donation.category}
        </span>
        <span className="text-brown font-semibold text-xl">
          {donation.title}
        </span>
        <p className="text-sm leading-4 min-h-[2rem] line-clamp-2">
          {donation.description}
        </p>
        <div className="text-sm text-brown mt-2 flex flex-col gap-y-1">
          <div className="flex justify-between">
            <span>
              <span className="font-bold">{donation.donor_count}</span> Donatur
            </span>
            <span>
              <span className="font-bold">
                {getRemainingDays(donation.deadline)}
              </span>{' '}
              sisa hari
            </span>
          </div>
          <Progress value={percentageAmount} className="h-2" />
          <div className="flex justify-between">
            <span>
              <span className="font-bold">Rp{donation.current_amount}</span>{' '}
              terkumpul
            </span>
            <span className="font-bold">{percentageAmount}%</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
