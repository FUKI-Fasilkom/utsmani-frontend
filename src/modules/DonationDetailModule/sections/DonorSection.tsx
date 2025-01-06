'use client'
import React, { useEffect, useState } from 'react'
import { Donor } from '../interface'
import { formatDuration, convertToRupiah } from '../utils'
import Image from 'next/image'
import { UserRound } from 'lucide-react'
import { DONOR_LIST } from '../constant'
import { WrapperCard } from '../module-elements'

type DonorSectionProps = {
  id: string
}

export const DonorSection: React.FC<DonorSectionProps> = () => {
  const [donors, setDonors] = useState<Donor[]>([])

  useEffect(() => {
    setDonors(DONOR_LIST)
  }, [])

  return (
    <WrapperCard className="text-brown">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
        Donatur ({donors.length})
      </h2>
      <div className="flex flex-col gap-5 mt-5 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-[#eedac6] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {donors.map((donor) => (
          <div
            key={donor.id}
            className="flex justify-start items-center gap-4 py-2 px-4 drop-shadow bg-white rounded-lg"
          >
            {/* Avatar */}
            {donor.avatar ? (
              <Image
                src={donor.avatar}
                alt={`${donor.name}'s avatar`}
                width={60}
                height={60}
                className="rounded-full object-cover w-16 h-16"
              />
            ) : (
              <div className="flex items-center justify-center w-16 h-16 p-1 rounded-full bg-[#eedac6]">
                <UserRound strokeWidth={1.5} className="w-full h-full" />
              </div>
            )}

            {/* Donor Information */}
            <div className="flex flex-col text-sm md:text-base">
              <span className="font-semibold">{donor.name}</span>
              <span>
                Berdonasi sebesar{' '}
                <span className="font-bold">
                  {convertToRupiah(donor.amount)}
                </span>
              </span>
              <span className="text-xs md:text-sm">
                {formatDuration(donor.created_at)} yang lalu
              </span>
            </div>
          </div>
        ))}
      </div>
    </WrapperCard>
  )
}
