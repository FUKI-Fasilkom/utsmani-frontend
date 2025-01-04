'use client'

import { Input } from '@/components/ui/input'
import { SlidersHorizontal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCallback } from 'react'

export const FilterControls = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentTypes =
    searchParams.get('types')?.split(',').filter(Boolean) || []
  const currentSort = searchParams.get('sort') || 'terbaru'
  const currentSearch = searchParams.get('search') || ''

  const createQueryString = useCallback(
    (params: { [key: string]: string }) => {
      const current = new URLSearchParams(searchParams.toString())
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          current.set(key, value)
        } else {
          current.delete(key)
        }
      })
      return current.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex gap-3 h-[60px]">
      <Input
        placeholder="Search..."
        className="h-full px-10 text-base md:text-lg md:placeholder:text-lg xl:text-2xl xl:placeholder:text-2xl"
        defaultValue={currentSearch}
        onChange={(e) => {
          const queryString = createQueryString({
            search: e.target.value,
            types: currentTypes.join(','),
            sort: currentSort,
          })
          router.push(`?${queryString}`)
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit rounded-[12px] p-1">
          <div className="flex justify-center items-center h-full w-fit [&_svg]:pointer-events-auto [&_svg]:size-6 bg-gradient-to-l from-[#DFA26C] to-[#A26840] text-neutral-50 grayscale-100 rounded-lg px-4">
            <SlidersHorizontal strokeWidth={3} size={6} className="size-6" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-3 bg-white1">
          <div className="flex flex-col gap-2">
            <Label>Sort By</Label>
            <RadioGroup
              value={currentSort}
              onValueChange={(value) => {
                const queryString = createQueryString({
                  sort: value,
                  types: currentTypes.join(','),
                  search: currentSearch,
                })
                router.push(`?${queryString}`)
              }}
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
  )
}
