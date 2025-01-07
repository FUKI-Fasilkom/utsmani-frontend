'use client'

import React, { useState, useEffect } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { DonationCard } from '../module-elements/DonationCard'
import { Donation } from '../interface'
import { Paginated } from '@/lib/pagination/interface'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export const DonationListSection: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState<number>(1)

  const pageSize = 6

  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPageParam = searchParams.get('page')
  const currentPage = currentPageParam ? parseInt(currentPageParam, 10) : 1

  const fetchDonations = async (page: number) => {
    if (isNaN(page) || page < 1) {
      console.warn(`Invalid page number: ${page}. Defaulting to 1.`)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donation?limit=${pageSize}&offset=${(page - 1) * pageSize}`,
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

      const data = (await response.json()) as Paginated<Donation>

      setDonations(data.results)

      const calculatedTotalPages = Math.ceil(data.count / pageSize)
      setTotalPages(calculatedTotalPages)

      if (page > calculatedTotalPages && calculatedTotalPages > 0) {
        router.push(`/wakaf?page=${calculatedTotalPages}`)
      }
    } catch (err: any) {
      console.error(err)
      setError('Failed to load donations. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDonations(currentPage)
  }, [currentPage, fetchDonations])

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return
    router.push(`/wakaf?page=${page}`)
  }

  return (
    <section className="bg-cream-1 lg:py-[28px]">
      {/* Donations List */}
      <div className="container flex flex-wrap px-4 lg:px-10">
        {/* Loading Skeletons */}
        {isLoading &&
          Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="w-1/2 md:w-1/3 p-2 lg:p-4">
              <Skeleton className="bg-white rounded-2xl p-3 drop-shadow-lg h-full animate-pulse" />
            </div>
          ))}

        {/* No Donations Message */}
        {!isLoading && donations.length === 0 && (
          <div className="w-full flex justify-center py-8">
            <p className="text-gray-500">No donations found.</p>
          </div>
        )}

        {/* Donations */}
        {!isLoading &&
          donations.map((donation) => (
            <div key={donation.id} className="w-1/2 md:w-1/3 p-2 lg:p-4">
              <DonationCard donation={donation} />
            </div>
          ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => handlePageClick(pageNumber)}
                    isActive={currentPage === pageNumber}
                    disabled={isLoading}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            {/* Ellipsis for Large Page Sets (Optional) */}
            {totalPages > 5 && (
              <>
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={
                  currentPage === totalPages || isLoading || totalPages === 0
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Loader Spinner (Optional: For when navigating pages) */}
      {isLoading && donations.length > 0 && (
        <div className="w-full flex justify-center my-4">
          <Loader2
            className="h-8 w-8 animate-spin text-gray-500"
            aria-label="Loading donations"
          />
        </div>
      )}

      {/* Error Message with Retry Button */}
      {error && (
        <div className="flex flex-col items-center mt-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchDonations(currentPage)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            aria-label="Retry fetching donations"
          >
            Retry
          </button>
        </div>
      )}

      {/* End of Donations Message */}
      {!isLoading && donations.length > 0 && currentPage === totalPages && (
        <div className="flex justify-center mt-4">
          <p className="text-gray-500">You have reached the end.</p>
        </div>
      )}
    </section>
  )
}
