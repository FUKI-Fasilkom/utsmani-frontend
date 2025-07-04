'use client'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { NewsQuoteItem } from './interface'
import Link from 'next/link'
import { filterAndSortItems } from './utils'
import { FilterControls } from './module-elements/FilterControls'

const fetchNewsQuotes = async (): Promise<NewsQuoteItem[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/news-quotes/`
  )
  const data = await response.json()
  return data.contents
}

export const NewsQuotesModule: React.FC = () => {
  const [items, setItems] = useState<NewsQuoteItem[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contents = await fetchNewsQuotes()
        setItems(contents)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const searchQuery = searchParams.get('search') || ''
  const types = searchParams.get('types')?.split(',').filter(Boolean) || []
  const sortOrder = searchParams.get('sort') || 'terbaru'

  const filteredItems = filterAndSortItems(items, searchQuery, types, sortOrder)

  return (
    <div className="flex flex-col gap-14 items-center w-full mb-20 lg:mb-40">
      <div className="flex w-full">
        <div className="max-sm:py-16 w-full sm:w-1/2 bg-brown grid place-items-center text-center">
          <h1 className="text-white1 text-5xl md:text-7xl xl:text-8xl font-bold">
            Berita & Quotes
          </h1>
        </div>

        <Image
          src={'https://picsum.photos/1400/700'}
          height={536}
          width={1442}
          alt="background image for quotes"
          className=" object-cover max-h-[536px] min-h-[300px] w-1/2 max-sm:hidden"
        />
      </div>
      <div className="flex flex-col gap-12 items-center w-full container">
        <FilterControls />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {filteredItems.map((item) => (
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
                <span className=" text-gray-500">
                  <Clock className="inline mr-2" />
                  {new Intl.DateTimeFormat('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format(new Date(item.updated_at))}
                </span>
                <span className="px-3 py-1 rounded-full ring-brown ring-2 text-brown">
                  {item.type === 'NEWS' ? 'News' : 'Quotes'}
                </span>
              </div>
              <p className="text-gray-600 line-clamp-4">{item.content}</p>
              <Button
                variant="secondary"
                className="self-center text-white1 mt-auto text-base px-[36px] py-[18px]"
                asChild
              >
                <Link
                  href={`/news-quotes/${item.type.toLocaleLowerCase()}/${item.id}`}
                >
                  Selengkapnya
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
