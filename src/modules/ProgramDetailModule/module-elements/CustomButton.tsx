'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

export const CustomButton: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Animasi scroll yang halus
        })
      }}
      className="text-xl mx-auto lg:mx-0 whitespace-normal text-white font-semibold w-80 h-16 bg-[#6C4534] rounded-full"
    >
      Daftar {title}
    </Button>
  )
}
