'use client'

import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Link from 'next/link'
import Image from 'next/image'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Partner } from '../interface'

export const PartnerSection = () => {
  const [partners, setPartners] = useState<Partner[]>([])

  const fetchPartners = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/homepage/partners/`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch partners data')
      }

      const data = await response.json()
      setPartners(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  if (partners.length === 0) {
    return null
  }

  return (
    <section className="container w-full flex flex-col px-4 gap-3 lg:gap-6 justify-center items-center pb-16">
      <h1 className="text-center text-[#6C4534] heading-2 font-bold">
        Partner
      </h1>
      <Carousel
        className="w-full"
        opts={{ loop: true, align: 'center' }}
        plugins={[
          AutoScroll({
            playOnInit: true,
            speed: 0.5,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {partners.map((partner) => (
            <CarouselItem
              key={partner.id}
              className="basis-1/3 md:basis-1/4 lg:basis-1/5 aspect-square px-2 md:px-4 lg:px-6 flex justify-center items-center"
            >
              {partner.website ? (
                <Link
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    width={400}
                    height={400}
                    className="object-contain"
                  />
                </Link>
              ) : (
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  width={400}
                  height={400}
                  className="object-contain"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
