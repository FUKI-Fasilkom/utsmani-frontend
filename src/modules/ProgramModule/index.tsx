import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextProgram,
  CarouselPreviousProgram,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'

type Program = {
  id: number
  title: string
  cover_image: string
}

async function getPrograms() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/program`, {
    next: { revalidate: 60 },
  })
  const responseJson = await response.json()
  const programs = (await responseJson.contents) as Program[]
  return programs
}

export const ProgramModule: React.FC = async () => {
  const programs = await getPrograms()
  return (
    <main className="flex flex-col gap-10 w-screen">
      <div className="h-full lg:h-[530px] w-full bg-[#6C4534] p-10 flex flex-col lg:flex-row justify-evenly items-center">
        <div className="flex justify-center items-center flex-col p-16 md:p-20 lg:p-24 gap-6">
          <h1 className="text-white title-lg">Program</h1>
          <h1 className="text-white subtitle-lg">Bersama Al-Qur&apos;an</h1>
        </div>
        {/* carousel */}
        <Carousel
          className="w-full lg:w-[600px] flex justify-center items-center relative lg:mr-16"
          opts={{ loop: true }}
        >
          <CarouselContent className="flex gap-3">
            {programs.map((program: Program) => (
              <CarouselItem
                key={program.id}
                className="w-[576px] h-[379px] flex justify-center items-center relative rounded-[24px] md:rounded-[32px] lg:rounded-[48px] overflow-hidden pl-0"
              >
                <div
                  className="absolute z-10 bottom-0 left-0 text-white px-16 py-6 w-full font-bold text-4xl drop-shadow-lg"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0) 100%)',
                  }}
                >
                  <p className="max-w-[400px] heading-2">{program.title}</p>
                </div>
                <Image
                  src={program.cover_image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPreviousProgram className="absolute -left-6 h-12 w-12" />
          <CarouselNextProgram className="absolute -right-6 h-12 w-12" />
        </Carousel>
      </div>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="container px-10 lg:px-20">
          <h1 className="heading-1 text-[#6C4534] text-center leading-relaxed p-6">
            Program Unggulan
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-12 place-content-center">
            {programs.map((program: Program) => (
              <Link href={`/program/${program.id}`} key={program.id}>
                <div className="w-full aspect-square border-2 rounded-[40px] relative overflow-hidden cursor-pointer border-[rgb(108,69,52)] hover:scale-105 transition-all">
                  <p
                    className="absolute w-full z-10 px-6 py-4 bottom-0 left-0 text-white font-semibold heading-5 drop-shadow-xl"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  >
                    {program.title}
                  </p>
                  <Image
                    src={program.cover_image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
