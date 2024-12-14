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
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DUMMY_ITEMS } from './constant'
import { Clock } from 'lucide-react'

export const NewsQuotesModule: React.FC = async () => {
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
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-fit rounded-[12px] p-1">
              <Button
                variant="primary"
                className="flex justify-center items-center h-full w-fit [&_svg]:pointer-events-auto [&_svg]:size-6"
              >
                <SlidersHorizontal
                  strokeWidth={4}
                  size={6}
                  className="size-6 "
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-3 bg-white1">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="berita" />
                  <Label htmlFor="berita">Berita</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="quotes" />
                  <Label htmlFor="quotes">Quotes</Label>
                </div>
              </div>
              <DropdownMenuSeparator className="my-2" />
              <div className="flex flex-col gap-2">
                <Label>Sort By</Label>
                <RadioGroup defaultValue="terbaru">
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
          {DUMMY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-4 rounded-xl border border-gray-200 shadow-md"
            >
              {/* <h3 className="text-center font-bold text-brown">{item.title}</h3> */}
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={400}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  <Clock className="inline mr-2" />
                  {new Date(item.date).toLocaleDateString('id-ID')}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-brown text-white1">
                  {item.type}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 line-clamp-4">{item.content}</p>
              <Button
                variant="secondary"
                className="self-center text-white1 hover:text-brown/80 mt-auto"
                asChild
              >
                <a href={`/news-quotes/${item.id}`}>Selengkapnya</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
