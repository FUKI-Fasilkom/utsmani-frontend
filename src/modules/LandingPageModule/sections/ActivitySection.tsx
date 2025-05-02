import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { ActivitySectionProps } from '../interface'
import Link from 'next/link'

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities,
}) => {
  return (
    <section className="w-full flex flex-col px-16 gap-3 lg:gap-6 justify-center items-center">
      <h1 className="text-center text-[#6C4534] heading-2 font-bold">
        Kegiatan
      </h1>

      {/* kegiatan atas */}
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="w-full py-10">
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
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
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
      </Carousel>
    </section>
  )
}
