'use client'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CalendarDays, Shirt, MapPin } from 'lucide-react'
import { ActivityItem } from './interface'
import Link from 'next/link'
import { filterAndSortItems } from './utils'
import { FilterControls } from './module-elements/FilterControls'

const fetchActivityList = async (): Promise<ActivityItem[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/activity/`
  )
  const data = await response.json()
  return data.contents
}

export const ActivityModule: React.FC = () => {
  const [items, setItems] = useState<ActivityItem[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contents = await fetchActivityList()
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
        <Image
          src={'https://picsum.photos/1400/700'}
          height={536}
          width={1442}
          alt="background image for activity"
          className=" object-cover max-h-[536px] min-h-[300px] w-1/2 max-sm:hidden"
        />
        <div className="max-sm:py-6 w-full sm:w-1/2 bg-brown grid place-items-center text-center">
          <h1 className="text-white1 text-5xl md:text-7xl xl:text-8xl font-bold">
            Activity
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-12 items-center w-full container">
        <FilterControls />
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-4 rounded-xl border border-gray-200 shadow-md"
            >
              <h3 className=" self-center text-2xl font-semibold text-brown md:text-3xl xl:text-4xl">
                {item.title}
              </h3>
              <Image
                src={item.cover_image}
                alt={item.title}
                width={400}
                height={400}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="flex justify-center flex-col gap-2 text-black">
                {item.activity_date && (
                  <div className="flex gap-2">
                    <div>
                      <CalendarDays
                        className="mr-2 text-brown"
                        strokeWidth={3}
                      />
                    </div>
                    {item.activity_date}
                  </div>
                )}
                {item.dresscode && (
                  <div className="flex gap-2">
                    <div>
                      <Shirt
                        className="mr-2 text-brown fill-brown"
                        fill="true"
                      />
                    </div>
                    {item.dresscode}
                  </div>
                )}
                {item.location && (
                  <div className="flex gap-2">
                    <div>
                      <MapPin className="mr-2  text-brown" strokeWidth={3} />
                    </div>
                    {item.location}
                  </div>
                )}
              </div>
              <div className="h-2 md:h-4"></div>
              <Button
                variant="secondary"
                className="self-center text-white1 text-base px-[36px] py-[18px] mt-auto"
                asChild
              >
                <Link href={`/${item.type.toLocaleLowerCase()}/${item.id}`}>
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
