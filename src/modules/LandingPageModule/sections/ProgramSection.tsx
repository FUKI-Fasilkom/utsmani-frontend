import { ProgramProps, ProgramSectionProps } from '../interface'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel' // Assuming this path is correct for your project structure

export const ProgramSection: React.FC<ProgramSectionProps> = ({ programs }) => {
  return (
    <section className="container items-center flex flex-col px-4 gap-8">
      <div className="mb-8">
        <h2 className="text-center text-brown font-bold heading-2">
          Program Unggulan <br /> Pesantren Tahfizh Al-Quran Al Utsmani
        </h2>
      </div>
      <div className="w-full px-10">
        {' '}
        {/* Added padding similar to TestimonySection for prev/next buttons */}
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="flex w-full">
            {programs.map((program: ProgramProps, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center basis-full sm:basis-1/2 lg:basis-1/4 p-2" // Added padding around item
              >
                <Link
                  href={`/program/${program?.id}`}
                  className="w-[240px] h-[240px] border-2 border-brown rounded-[40px] overflow-hidden flex items-center justify-center relative"
                >
                  <Image
                    src={program?.cover_image}
                    alt={program?.title}
                    className="object-cover w-full h-full"
                    width={288}
                    height={272}
                  />
                  <div
                    className="py-4 px-2 absolute bottom-0 w-full flex justify-center "
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0, 0, 0, 0.5) 80%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  >
                    <span className="paragraph-lg font-semibold text-center text-white1 rounded-lg">
                      {program.title}
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-10 md:ml-5 ">Prev</CarouselPrevious>{' '}
          <CarouselNext className="mr-10 md:mr-5 ">Next</CarouselNext>{' '}
        </Carousel>
      </div>
    </section>
  )
}
