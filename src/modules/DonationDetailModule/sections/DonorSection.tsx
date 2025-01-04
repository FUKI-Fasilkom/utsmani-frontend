import React from 'react'
import { Donor } from '../interface'
import { formatDuration, convertToRupiah } from '../utils'
import Image from 'next/image'
import { UserRound } from 'lucide-react'

type DonorSectionProps = {
  donors: Donor[]
}

export const DonorSection: React.FC<DonorSectionProps> = ({ donors }) => {
  return (
    <section className="px-10 py-12 text-brown rounded-[32px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]">
      <h2 className="text-2xl font-semibold">Donatur ({donors.length})</h2>
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
            <div className="flex flex-col">
              <span className="font-semibold">{donor.name}</span>
              <span>
                Berdonasi sebesar{' '}
                <span className="font-bold">
                  {convertToRupiah(donor.amount)}
                </span>
              </span>
              <span className="text-sm">
                {formatDuration(donor.created_at)} yang lalu
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
