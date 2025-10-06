import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Testimony } from '../interface'
import { Quote, UserIcon } from 'lucide-react'

async function getTestimonies(): Promise<Testimony[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/testimony/`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch testimonies data')
    }

    const data = await response.json()
    return data.contents
  } catch (error) {
    console.error(error)
    return []
  }
}

export const TestimonySection: React.FC = async () => {
  const testimonies = await getTestimonies()

  if (testimonies.length === 0) {
    return null
  }

  return (
    <section className="container flex flex-col gap-6 items-center text-brown px-10">
      <div>
        <h2 className="font-bold heading-2 text-center">
          Apa kata mereka tentang Al-Utsmani?
        </h2>
      </div>
      <div className="flex justify-center w-full">
        <Carousel className="w-full" opts={{ loop: true, align: 'start' }}>
          <CarouselContent className="flex w-full">
            {testimonies.map((testimony, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col gap-4 h-auto basis-full md:basis-1/2 lg:basis-1/3 px-4"
              >
                <div className="flex flex-col gap-4 h-full w-full mx-auto max-w-[90%]">
                  <div className="p-8 shadow-lg drop-shadow-sm h-[300px] w-full rounded-2xl relative flex justify-center items-center">
                    <Quote className="absolute top-2 left-2 text-brown" />
                    <p className="paragraph-sm italic font-medium leading-6 line-clamp-10 text-justify">
                      {testimony.description}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center grow">
                    {testimony.image ? (
                      <Image
                        src={testimony.image}
                        height={64}
                        width={64}
                        alt="pp testimony"
                        className="rounded-full h-16 w-16"
                      />
                    ) : (
                      <UserIcon className="h-16 w-16 text-brown" />
                    )}
                    <div>
                      <h4 className="font-bold paragraph">{testimony.name}</h4>
                      <p className="font-medium paragraph-sm">
                        {testimony.role}
                      </p>
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
