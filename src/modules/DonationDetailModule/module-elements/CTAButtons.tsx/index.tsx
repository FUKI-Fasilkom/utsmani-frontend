'use client'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import React from 'react'

export const CTAButtons = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Button
        className="h-10 md:text-lg md:h-12"
        variant={'secondary'}
        onClick={() => {
          console.log('Donasi Sekarang clicked')
        }}
      >
        Donasi Sekarang
      </Button>
      <Button className="h-10 md:text-lg md:h-12" variant={'tertiary'}>
        Narahubung
      </Button>
      <button className="group flex text-brown self-center items-center gap-x-2">
        <Share2 className="rotate-180 fill-brown w-5 h-5" />
        <span className="group-hover:underline text-sm md:text-base">
          Bagikan
        </span>
      </button>
    </div>
  )
}
