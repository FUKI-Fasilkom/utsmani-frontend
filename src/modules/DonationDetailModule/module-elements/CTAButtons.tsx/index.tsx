'use client'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

export const CTAButtons = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleDonateClick = () => {
    const sanitizedPath = pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname
    const donatePath = `${sanitizedPath}/donate`
    router.push(donatePath)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        className="h-10 md:text-lg md:h-12"
        variant={'secondary'}
        onClick={handleDonateClick}
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
