'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { ActivityItem } from './interface'
import { filterAndSortItems } from './utils'
import { FilterControls } from './module-elements/FilterControls'
import { Banner } from './sections/Banner'
import { ActivityCard } from './module-elements/ActivityCard'

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
      <Banner />
      <div className="flex flex-col gap-12 items-center w-full container">
        <FilterControls />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {filteredItems.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
