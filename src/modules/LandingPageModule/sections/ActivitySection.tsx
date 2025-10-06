import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { ActivityProps } from '../interface'
import Link from 'next/link'

async function getActivities(): Promise<ActivityProps[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/activity/?is_featured=true`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch activities data')
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error(error)
    return []
  }
}

export const ActivitySection: React.FC = async () => {
  const activities = await getActivities()

  if (activities.length === 0) {
    return null
  }

  return (
    <section className="container w-full flex flex-col px-4 gap-3 lg:gap-6 justify-center items-center">
      <h1 className="text-center text-[#6C4534] heading-2 font-bold">
        Kegiatan
      </h1>

      <Carousel
        className="w-full px-5 py-4 md:py-8 lg:py-10"
        opts={{ loop: true, align: 'start' }}
      >
        <CarouselContent className="w-full">
          {activities.map((activity) => (
            <CarouselItem
              className="basis-full md:basis-1/2 lg:basis-1/3 w-[444px] h-[304px] flex justify-center items-center perspective-1600 relative group"
              key={activity.id}
            >
              <Link
                href={`/activity/${activity.id}`}
                className={`w-full h-full flex justify-center overflow-hidden items-center transform-style-3d transform-cpu transition-all rounded-[1.25rem] bg-cover`}
              >
                <Image
                  src={activity.cover_image}
                  alt="Aktifitas"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                <div
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0) 100%)',
                  }}
                  className="absolute bottom-0 inset-x-0 py-4 flex justify-center items-center"
                >
                  <span className="text-white text-lg text-center">
                    {activity.title}
                  </span>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-10 md:ml-5">Prev</CarouselPrevious>
        <CarouselNext className="mr-10 md:mr-5">Next</CarouselNext>
        <CarouselDots />
      </Carousel>
    </section>
  )
}
