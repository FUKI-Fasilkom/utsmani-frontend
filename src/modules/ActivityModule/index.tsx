/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'

import { ActivityItem } from './interface'
import { FilterControls } from './module-elements/FilterControls'
import { Banner } from './sections/Banner'
import { ActivityCard } from './module-elements/ActivityCard'
import { Paginated } from '@/lib/pagination/interface'

export const ActivityModule: React.FC = () => {
  const [items, setItems] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState<number>(1)

  const pageSize = 12

  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current page and filter values from the URL
  const currentPageParam = searchParams.get('page')
  const currentPage = currentPageParam ? parseInt(currentPageParam, 10) : 1
  const searchQuery = searchParams.get('search') || ''
  const ordering = searchParams.get('ordering') || '-created_at'

  const fetchActivities = async ({
    page,
    search,
    ordering,
  }: {
    page: number
    search: string
    ordering: string
  }) => {
    if (isNaN(page) || page < 1) {
      page = 1 // Default to page 1 if invalid
    }

    setIsLoading(true)
    setError(null)

    try {
      const queryParams = new URLSearchParams({
        limit: pageSize.toString(),
        offset: ((page - 1) * pageSize).toString(),
        ordering: ordering,
      })

      if (search) queryParams.append('search', search)

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/blog/activity/?${queryParams.toString()}`
      )

      if (!response.ok) {
        throw new Error(`Error fetching activities: ${response.statusText}`)
      }

      const data = (await response.json()) as Paginated<ActivityItem>

      setItems(data.results)

      const calculatedTotalPages = Math.ceil(data.count / pageSize)
      setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1)

      // Redirect to the last page if the current page is out of bounds
      if (page > calculatedTotalPages && calculatedTotalPages > 0) {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.set('page', calculatedTotalPages.toString())
        router.push(`/activity?${newParams.toString()}`)
      }
    } catch (err: any) {
      console.error(err)
      setError('Failed to load activities. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities({
      page: currentPage,
      search: searchQuery,
      ordering: ordering,
    })
  }, [currentPage, searchQuery, ordering])

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return

    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.set('page', page.toString())

    router.push(`/activity?${currentParams.toString()}`)
  }

  return (
    <div className="flex flex-col gap-14 items-center w-full mb-20 lg:mb-40">
      <Banner />
      <div className="flex flex-col gap-12 items-center w-full container">
        <FilterControls />

        {/* Loading State: Show Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {Array.from({ length: pageSize }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-96 w-full rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="w-full flex justify-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && items.length === 0 && (
          <div className="w-full flex justify-center py-8">
            <p className="text-gray-500">No activities found.</p>
          </div>
        )}

        {/* Content: Display Activity Cards */}
        {!isLoading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {items.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Pagination Controls: Only show if there's more than one page */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageClick(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                    className={
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                  />
                </PaginationItem>

                {/* Generate Page Links */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageClick(pageNumber)}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageClick(currentPage + 1)}
                    aria-disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}
