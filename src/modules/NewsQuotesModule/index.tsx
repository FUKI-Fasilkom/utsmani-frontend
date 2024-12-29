'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown'
import { Input } from '@/components/ui/input'
import { SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { DUMMY_ITEMS } from './constant'
import { Clock } from 'lucide-react'
import { NewsQuoteItem } from './interface'
import Link from 'next/link'

interface Filters {
  berita: boolean
  quotes: boolean
}

export const NewsQuotesModule: React.FC = () => {
  const [items, setItems] = useState<NewsQuoteItem[]>([])
  const [filteredItems, setFilteredItems] = useState<NewsQuoteItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({
    berita: false,
    quotes: false,
  })
  const [sortOrder, setSortOrder] = useState<'terbaru' | 'terlama'>('terbaru')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/news-quotes/`
        )
        const data = await response.json()
        const contents = await data.contents
        setItems(contents)
        setFilteredItems(contents)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let result = [...items]

    // Apply search filter
    if (searchQuery) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply type filters
    if (filters.berita || filters.quotes) {
      result = result.filter(
        (item) =>
          (filters.berita && item.type === 'NEWS') ||
          (filters.quotes && item.type === 'QUOTE')
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime()
      const dateB = new Date(b.updated_at).getTime()
      return sortOrder === 'terbaru' ? dateB - dateA : dateA - dateB
    })

    setFilteredItems(result)
  }, [items, searchQuery, filters, sortOrder])

  return (
    <div className="flex flex-col gap-14 items-center w-full mb-20 lg:mb-40">
      <div className="flex w-full">
        <div className="w-1/2 bg-brown grid place-items-center text-center">
          <h1 className="text-white1 text-6xl md:text-7xl xl:text-8xl font-bold">
            Berita & Quotes
          </h1>
        </div>

        <Image
          src={'https://picsum.photos/1400/700'}
          height={536}
          width={1442}
          alt="backgorund image for quotes"
          className=" object-cover max-h-[536px] min-h-[300px] w-1/2"
        />
      </div>
      <div className="flex flex-col gap-12 items-center w-full container">
        <div className="flex gap-3 h-[60px]">
          <Input
            placeholder="Search..."
            className="h-full px-10 text-2xl placeholder:text-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="w-fit rounded-[12px] p-1">
              <div className="flex justify-center items-center h-full w-fit [&_svg]:pointer-events-auto [&_svg]:size-6 bg-gradient-to-l from-[#DFA26C] to-[#A26840] text-neutral-50 grayscale-100 rounded-lg px-4">
                <SlidersHorizontal
                  strokeWidth={4}
                  size={6}
                  className="size-6"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-3 bg-white1">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="berita"
                    checked={filters.berita}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        berita: checked === true,
                      }))
                    }
                  />
                  <Label htmlFor="berita">Berita</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="quotes"
                    checked={filters.quotes}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        quotes: checked === true,
                      }))
                    }
                  />
                  <Label htmlFor="quotes">Quotes</Label>
                </div>
              </div>
              <DropdownMenuSeparator className="my-2" />
              <div className="flex flex-col gap-2">
                <Label>Sort By</Label>
                <RadioGroup
                  value={sortOrder}
                  onValueChange={(value: 'terbaru' | 'terlama') =>
                    setSortOrder(value)
                  }
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="terbaru" id="terbaru" />
                    <Label htmlFor="terbaru">Terbaru</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="terlama" id="terlama" />
                    <Label htmlFor="terlama">Terlama</Label>
                  </div>
                </RadioGroup>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {filteredItems?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-4 rounded-xl border border-gray-200 shadow-md"
            >
              <h3 className=" self-center text-2xl font-semibold text-brown md:text-3xl xl:text-4xl">
                {item.title}
              </h3>
              {/* <h3 className="text-center font-bold text-brown">{item.title}</h3> */}
              <Image
                src={item.cover_image}
                alt={item.title}
                width={400}
                height={400}
                className="w-full h-[200px] object-cover rounded-lg"
              />

              <div className="flex justify-between items-center ">
                <span className=" text-gray-500">
                  <Clock className="inline mr-2" />
                  {new Date(item.updated_at).toLocaleDateString('id-ID')}
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
                <Link href={`blog/news-quotes/${item.id}`}>Selengkapnya</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
