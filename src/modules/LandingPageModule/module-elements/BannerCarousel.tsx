'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

interface Banner {
  name: string
  imageUrl: string
  link: string | null
}

interface BannerCarouselProps {
  banners: Banner[]
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  return (
    <Carousel
      className="w-full h-full relative"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="h-full">
        {banners.map((banner, index) => (
          <CarouselItem key={index} className="px-0">
            <Link
              href={banner.link || '#'}
              className="block relative w-full h-full"
            >
              <Image
                src={banner.imageUrl}
                alt={banner.name}
                className="w-full h-full object-cover"
                fill
                priority={index === 0}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="absolute bottom-4 inset-x-0" />
    </Carousel>
  )
}
