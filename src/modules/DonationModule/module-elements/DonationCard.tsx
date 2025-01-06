// /components/DonationCard.tsx

'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Donation } from '../interface'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { convertToRupiah, getDuration } from '@/modules/DonationDetailModule/utils'
import parse from 'html-react-parser'
import { Skeleton } from '@/components/ui/skeleton'

interface DonationCardProps {
  donation: Donation
}

export const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  const [description, setDescription] = useState<string>('')
  const [parsedDescription, setParsedDescription] =
    useState<React.ReactNode>(null)

  useEffect(() => {
    setDescription(donation.description)
  }, [donation.description])

  useEffect(() => {
    if (description) {
      setParsedDescription(parse(description))
    }
  }, [description])


  const percentageAmount =
    (donation.current_amount / donation.target_amount) * 100

  return (
    <Link
      href={`/wakaf/${donation.id}`}
      className="block bg-white rounded-2xl p-3 drop-shadow-lg"
    >
      <Image
        src={donation.banner.url}
        height={200}
        width={360}
        alt={donation.title}
      />
      <div className="flex flex-col  md:gap-y-1">
        <span className="text-brown/80 font-semibold text-xs md:text-sm lg:text-base">
          {donation.category}
        </span>
        <span className="text-brown font-semibold md:text-lg lg:text-xl">
          {donation.title}
        </span>
        <div className="text-[10px] md:text-xs lg:text-sm leading-[0.75rem] md:leading-[1rem] lg:leading-[1.25rem] min-h-[1.5rem] md:min-h-[2rem] lg:min-h-[2.5rem] line-clamp-2">
          {parsedDescription || (
            <Skeleton className="h-[10px] md:h-[12px] lg:h-[14px] rounded-full" />
          )}
        </div>
        <div className="text-[10px] md:text-xs lg:text-sm text-brown mt-2 flex flex-col gap-y-1">
          <div className="flex justify-between">
            <span>
              <span className="font-bold">{donation.donor_count}</span> Donatur
            </span>
            <span>
              <span className="font-bold">
                {getDuration(donation.deadline, 'hari', true)}
              </span>{' '}
              sisa hari
            </span>
          </div>
          <Progress value={percentageAmount} className="h-2" />
          <div className="flex justify-between items-center h-[1.5rem] md:h-[2rem] lg:h-[2.5rem]">
            <span className="flex-1">
              Terkumpul{' '}
              <span className="font-bold">
                {convertToRupiah(donation.current_amount)}
              </span>
            </span>
            <span className="font-bold flex-1 text-end">
              {percentageAmount.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
