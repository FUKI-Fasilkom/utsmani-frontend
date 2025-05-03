import { TESTIMONY_EXAMPLES } from '../constant'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export const TestimonySection: React.FC = () => {
  const testimonyCards = TESTIMONY_EXAMPLES

  return (
    <section className="container flex flex-col gap-6 items-center text-brown px-10">
      <div>
        <h2 className="font-bold heading-2 text-center">
          Apa kata mereka tentang Al-Utsmani?
        </h2>
      </div>
      <div className="flex justify-center w-full">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="flex w-full">
            {testimonyCards.map((testimony, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col gap-4 h-auto basis-full md:basis-1/2 lg:basis-1/3 px-4"
              >
                <div className="flex flex-col gap-4 h-full w-full justify-between mx-auto max-w-[90%]">
                  <div className="py-8 px-10 shadow-lg drop-shadow-sm h-full w-full rounded-2xl">
                    <p className="italic font-medium leading-6 line-clamp-5">
                      {testimony.quote}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={testimony.profilePicture}
                      height={64}
                      width={64}
                      alt="pp testimony"
                      className="rounded-full h-16 w-16"
                    />
                    <div>
                      <h4 className="font-bold text-xl">{testimony.nama}</h4>
                      <p className="font-medium text-lg">{testimony.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-10 md:ml-5">Prev</CarouselPrevious>
          <CarouselNext className="mr-10 md:mr-5">Next</CarouselNext>
        </Carousel>
      </div>
    </section>
  )
}
