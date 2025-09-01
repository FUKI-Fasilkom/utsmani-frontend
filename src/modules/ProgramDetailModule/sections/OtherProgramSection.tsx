'use client'
import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'
import { Program } from '../interface'

export const OtherProgramSection = () => {
  const [programs, setPrograms] = useState<Program[]>([])
  const getPrograms = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/program/`
      )
      const responseJson = await response.json()
      setPrograms(responseJson.contents || [])
    } catch (error) {
      toast.error('Gagal memuat program lainnya')
    }
  }

  useEffect(() => {
    getPrograms()
  }, [])

  return (
    <div className="flex flex-col relative justify-center items-center gap-3 mt-10">
      <h1 className="rounded-full bg-[#6C4534] text-white font-semibold heading-3 w-fit text-center px-7 py-4 z-10">
        Program Lainnya
      </h1>
      <hr className="absolute h-1 bg-[#6C4534] w-1/2 z-0 top-8" />
      <Carousel
        className="flex justify-center items-center relative mb-16 w-full max-w-screen-xl"
        opts={{ loop: true }}
      >
        <CarouselContent className="flex gap-2 py-10 px-7">
          {programs.map((program: Program) => (
            <CarouselItem
              key={program.id}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 w-[300px] h-[200px] flex justify-center items-center relative rounded-2xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)] border-4 border-white group"
            >
              <Link href={`/program/${program.id}`} className="w-full h-full">
                <Image
                  src={program.cover_image}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <h3 className="text-white font-bold text-center px-4">
                    {program.title}
                  </h3>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-10 md:ml-5 ">Prev</CarouselPrevious>
        <CarouselNext className="mr-10 md:mr-5 ">Next</CarouselNext>
      </Carousel>
    </div>
  )
}
