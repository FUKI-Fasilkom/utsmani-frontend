/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState } from 'react'
import { Donor } from '../interface'
import { formatDuration, convertToRupiah } from '../utils'
import Image from 'next/image'
import { Loader2, UserRound } from 'lucide-react'
import { WrapperCard } from '../module-elements'
import { Paginated } from '@/lib/pagination/interface'
import InfiniteScroll from '@/components/ui/infinite-scroll'

type DonorSectionProps = {
  id: string
}

export const DonorSection: React.FC<DonorSectionProps> = (props) => {
  const [donors, setDonors] = useState<Donor[]>([])
  const [donorCount, setDonorCount] = useState(0)
  const [page, setPage] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)
  const [firstLoading, setFirstLoading] = React.useState(true)

  const pageSize = 10

  const fetchDonor = async () => {
    setLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donation/${props.id}/donors?limit=${pageSize}&offset=${page * pageSize}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Error fetching donations: ${response.statusText}`)
      }
      const data = (await response.json()) as Paginated<Donor>
      setDonors((prevDonors) => [...prevDonors, ...data.results])
      setDonorCount(data.count)
      setPage((prevPage) => prevPage + 1)

      if (data.next === null) {
        setHasMore(false)
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      setFirstLoading(false)
      setLoading(false)
    }
  }

  return (
    <WrapperCard className="text-brown">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
        Donatur ({donorCount})
      </h2>
      <div className="flex flex-col gap-5 mt-5 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-[#eedac6] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {donors.map((donor) => (
          <DonorCard donor={donor} key={donor.id} />
        ))}

        {/* No Donors Message */}
        {!firstLoading && donors.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <Image
              src={'/assets/images/empty_feature_donations.png'}
              alt="Donation jar"
              height={600}
              width={420}
            />
            <p className="text-gray-500">Jadilah donatur pertama</p>
          </div>
        )}

        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={fetchDonor}
          threshold={0.5}
        >
          {hasMore && (
            <div className="w-full flex justify-center items-center">
              <Loader2 className="h-1/3 w-1/3 animate-spin my-4" />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </WrapperCard>
  )
}

const DonorCard: React.FC<{ donor: Donor }> = ({ donor }) => {
  return (
    <div
      key={donor.id}
      className="flex justify-start items-center gap-4 py-2 px-4 drop-shadow bg-white rounded-lg"
    >
      {/* Avatar */}
      {donor.avatar && !donor.is_anonymous ? (
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
        <span className="font-semibold">
          {donor.is_anonymous ? 'Anonim' : donor.name}
        </span>
        <span>
          Berdonasi sebesar{' '}
          <span className="font-bold">{convertToRupiah(donor.amount)}</span>
        </span>
        <span className="text-xs md:text-sm">
          {formatDuration(donor.created_at, true)} yang lalu
        </span>
      </div>
    </div>
  )
}
