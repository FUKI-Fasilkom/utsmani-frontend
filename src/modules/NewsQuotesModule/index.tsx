'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { NewsQuoteItem } from './interface'
import { FilterControls } from './module-elements/FilterControls'
import { Banner } from './sections'
import { Paginated } from '@/lib/pagination/interface'

export const NewsQuotesModule: React.FC = () => {
  const [items, setItems] = useState<NewsQuoteItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState<number>(1)

  const pageSize = 12

  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPageParam = searchParams.get('page')
  const currentPage = currentPageParam ? parseInt(currentPageParam, 10) : 1

  const typeFilter = searchParams.get('type') || ''
  const searchQuery = searchParams.get('search') || ''
  const sortOrder = searchParams.get('ordering') || '-created_at' // Default to newest

  const fetchNewsQuotes = async ({
    page,
    type,
    ordering,
    search,
  }: {
    page: number
    type: string
    ordering: string
    search: string
  }) => {
    setIsLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams({
        limit: pageSize.toString(),
        offset: ((page - 1) * pageSize).toString(),
        ordering: ordering,
      })
      if (type) queryParams.append('type', type)
      if (search) queryParams.append('search', search)

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/blog/news-quotes/?${queryParams.toString()}`
      )
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }
      const data = (await response.json()) as Paginated<NewsQuoteItem>
      setItems(data.results)
      const calculatedTotalPages = Math.ceil(data.count / pageSize)
      setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1)
    } catch (err: any) {
      console.error(err)
      setError('Failed to load news and quotes. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNewsQuotes({
      page: currentPage,
      type: typeFilter,
      ordering: sortOrder,
      search: searchQuery,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, typeFilter, sortOrder, searchQuery])

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.set('page', page.toString())
    router.push(`/news-quotes?${currentParams.toString()}`)
  }

  return (
    <div className="flex flex-col gap-14 items-center w-full mb-20 lg:mb-40">
      <Banner />
      <div className="flex flex-col gap-12 items-center w-full container">
        <FilterControls />

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {Array.from({ length: pageSize }).map((_, index) => (
              <Skeleton key={index} className="h-[450px] w-full rounded-xl" />
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
            <p className="text-gray-500">No news or quotes found.</p>
          </div>
        )}

        {/* Content */}
        {!isLoading && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-4 rounded-xl border border-gray-200 shadow-md"
              >
                <Image
                  src={item.cover_image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="w-full h-[200px] object-cover rounded-lg"
                />
                <h3 className="self-center font-semibold text-brown heading-5">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center ">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="inline mr-2 h-4 w-4" />
                    {new Intl.DateTimeFormat('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date(item.created_at))}
                  </span>
                  <span className="px-3 py-1 rounded-full ring-brown ring-1 text-brown text-sm">
                    {item.type === 'NEWS' ? 'News' : 'Quotes'}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  className="self-center text-white1 mt-auto text-base px-8 py-4"
                  asChild
                >
                  <Link
                    href={`/news-quotes/${item.type.toLowerCase()}/${item.id}`}
                  >
                    Selengkapnya
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
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
                {/* We can add more complex logic here for ellipsis later if needed */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageClick(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
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
