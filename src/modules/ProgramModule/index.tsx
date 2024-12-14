import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextProgram,
  CarouselPreviousProgram,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Program = {
  id: number
  title: string
  cover_image: string
}

async function getPrograms() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/program`)
  const responseJson = await response.json()
  const programs = await responseJson.contents
  return programs
}

export const ProgramModule: React.FC = async () => {
  const programs = await getPrograms()
  return (
    <main className="flex flex-col gap-20 w-screen">
      <div className="h-[530px] w-full bg-[#6C4534] p-10 flex justify-evenly">
        <div className="flex justify-center items-center flex-col p-24 gap-6">
          <h1 className="text-white font-bold text-7xl">Program</h1>
          <h1 className="text-white font-semibold text-5xl">
            Bersama Al-Qur’an
          </h1>
        </div>
        {/* carousel */}
        <Carousel
          className="w-[600px] flex justify-center items-center relative mr-16"
          opts={{ loop: true }}
        >
          <CarouselContent className="flex gap-3">
            {programs.map((program: Program) => (
              <CarouselItem
                key={program.id}
                className="w-[576px] h-[379px] flex justify-center items-center relative rounded-[55px] overflow-hidden"
              >
                <p className="absolute z-10 bottom-6 left-6 text-white p-5 font-bold text-4xl drop-shadow-lg max-w-[400px]">
                  {program.title}
                </p>
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
        <div className="w-[800px] flex justify-center items-center gap-3">
          <div className="relative w-[614px] flex h-14">
            <svg
              width="50"
              height="50"
              viewBox="0 0 51 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[3px]"
            >
              <path
                d="M24.3634 32.9543C29.3841 32.9543 33.4543 28.8841 33.4543 23.8634C33.4543 18.8426 29.3841 14.7725 24.3634 14.7725C19.3426 14.7725 15.2725 18.8426 15.2725 23.8634C15.2725 28.8841 19.3426 32.9543 24.3634 32.9543Z"
                stroke="#8DA0B1"
                strokeWidth="2.27273"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35.7272 35.2272L30.8408 30.3408"
                stroke="#8DA0B1"
                strokeWidth="2.27273"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              className="w-full h-full rounded-full shadow-md items-center px-12 text-[#8DA0B1] text-lg focus:outline-0"
              placeholder="Search..."
            />
          </div>
          <div className="w-14 h-14">
            <Button className="w-full h-full rounded-3xl">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5 4H14.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 4H3.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.5 12H12.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 12H3.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.5 20H16.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 20H3.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 2V6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 10V14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 18V22"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div className="p-20">
          <h1 className="text-5xl font-bold text-[#6C4534] text-center leading-relaxed p-6">
            Program Unggulan <br /> Pesantren Tahfizh Al-Quran Al-Utsmani
          </h1>
          <div className="grid grid-cols-4 gap-5 py-12">
            {programs.map((program: Program) => (
              <a href={`program/${program.id}`} key={program.id}>
                <div className="w-[288px] h-[272px] border-2 rounded-[40px] relative overflow-hidden cursor-pointer border-[#6C4534] hover:scale-105 transition-all">
                  <p className="absolute z-10 p-6 bottom-0 left-0 text-white font-bold text-2xl drop-shadow-xl text-center">
                    {program.title}
                  </p>
                  <Image
                    src={program.cover_image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
