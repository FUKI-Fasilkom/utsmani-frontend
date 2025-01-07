import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui/carousel'
import { ImageType } from '@/modules/DonationModule/interface'
import Image from 'next/image'
import React from 'react'

// const DUMMY_POSTER =
//   'https://s3-alpha-sig.figma.com/img/841c/bb21/c27ab76a4fcbcb5482587eeb666bfbf9?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ljrSddQAYYbwvcup9UYlZQMZLgGDGvhZ4RRoRv6ijRfAdDp3hhWop72xEnV~5rhGssyaFyNhnfI681bFJJUDupMgSveUYLk0NAUDNLPp-xNqKvZOhe~huz3cSCXEmhLCAQHbXYQ00WDF2qMIQgVDC79jm2MDXohl1skPQXsarYAAcC8synjAmCC2IlAzdGZoDMI20bs1~cFk1A2BMZ~tsVNa2Imod8T1Tc2-HW4~2WGDPLN2Q8Nxo1FNHpLxYjLpRz-YUIZcXwa7lnMPpyDDYEtDGGa8t4gnR4y5ZAP-WxK9rcUqvXdRoOgKTKpyr14f0enpwewJ~RMVEDIeb4Acyw__'

interface DonationCarouselSectionProps {
  images: ImageType[]
}

export const DonationCarouselSection: React.FC<
  DonationCarouselSectionProps
> = ({ images }) => {
  return (
    <div className="px-12 flex justify-center">
      <Carousel opts={{ loop: true }} className="w-full max-w-md">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <Image
                src={image.image_url}
                alt={`Poster ${image.image_url}`}
                className="p-1"
                width={1800}
                height={2560}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious variant="secondary" />
        <CarouselNext variant="secondary" />
        <CarouselDots />
      </Carousel>
    </div>
  )
}
