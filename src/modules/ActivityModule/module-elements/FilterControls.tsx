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
import { useCallback, useState, useEffect } from 'react'

export const FilterControls = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentTypes =
    searchParams.get('type')?.split(',').filter(Boolean) || []
  const currentOrdering = searchParams.get('ordering') || '-created_at'
  const currentSearch = searchParams.get('search') || ''

  const [searchTerm, setSearchTerm] = useState(currentSearch)

  useEffect(() => {
    setSearchTerm(currentSearch)
  }, [currentSearch])

  const createQueryString = useCallback(
    (params: { [key: string]: string }) => {
      const current = new URLSearchParams(searchParams.toString())
      current.set('page', '1')
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

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const queryString = createQueryString({
        search: searchTerm,
        type: currentTypes.join(','),
        ordering: currentOrdering,
      })
      router.push(`?${queryString}`)
    }
  }

  return (
    <div className="flex gap-3 h-[60px]">
      <Input
        placeholder="Search..."
        className="h-full px-10 text-base md:text-lg md:placeholder:text-lg xl:text-2xl xl:placeholder:text-2xl"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearchSubmit}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="w-fit rounded-[12px] p-1">
          <div className="flex justify-center items-center h-full w-fit [&_svg]:pointer-events-auto [&_svg]:size-6 bg-gradient-to-l from-[#DFA26C] to-[#A26840] text-neutral-50 grayscale-100 rounded-lg px-4">
            <SlidersHorizontal strokeWidth={3} size={6} className="size-6" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-3 bg-white1">
          <div className="flex flex-col gap-2">
            <Label>Sort By</Label>
            <RadioGroup
              value={currentOrdering}
              onValueChange={(value) => {
                const queryString = createQueryString({
                  ordering: value,
                  type: currentTypes.join(','),
                  search: searchTerm,
                })
                router.push(`?${queryString}`)
              }}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="-created_at" id="terbaru" />
                <Label htmlFor="terbaru">Terbaru</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="created_at" id="terlama" />
                <Label htmlFor="terlama">Terlama</Label>
              </div>
            </RadioGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
