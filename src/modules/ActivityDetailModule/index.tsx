'use server'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FaClock, FaShareAlt, FaUser } from 'react-icons/fa'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextProgram,
  CarouselPreviousProgram,
} from '@/components/ui/carousel'
import Link from 'next/link'

type ActivityDetail = {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
  cover_image: string
  location: string | null
  activity_date: string | null
  dresscode: string | null
  images: {
    id: string
    image_url: string
    created_at: string
    updated_at: string
  }[]
}

type ActivityDetailModuleProps = {
  id: string
}

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

async function getActivityDetail(id: string) {
  const activityId = id
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/activity/${activityId}`
    )
    const responseJson = await response.json()
    const activityDetail = (await responseJson.contents) as ActivityDetail

    return activityDetail
  } catch (error) {
    console.log('Error fetching program detail:', error)
  }
}

export const ActivityDetailModule: React.FC<
  ActivityDetailModuleProps
> = async ({ id }) => {
  const activityDetail = await getActivityDetail(id)
  const programs = await getPrograms()
  return activityDetail ? (
    <div className="flex flex-col gap-14 items-center mb-20 lg:mb-40">
      <Image
        src={activityDetail?.cover_image ?? ''}
        height={658}
        width={1442}
        alt="background image for quotes"
        className="w-full object-cover max-h-[400px]"
      />
      <div className="space-y-[60px] container flex flex-col justify-center items-center">
        <div className="w-full flex justify-between">
          <div className="space-y-4">
            <h2 className="mb-3 text-brown font-bold text-3xl">Kegiatan</h2>
            <h1 className="font-semibold text-5xl">{activityDetail?.title}</h1>
            <p className="text-brown italic font-medium text-base space-x-12">
              <span className="items-center space-x-1">
                <FaClock className="inline pb-1 pr-1" />
                Posted on{' '}
                <strong>
                  {new Date(
                    activityDetail?.created_at ?? ''
                  ).toLocaleDateString('id-ID')}
                </strong>
              </span>
              {/* Keep author section as is since it's not in the API response */}
              <span className="items-center space-x-1">
                <FaUser className="inline pb-1 pr-1" />
                Posted by
                <strong>Nama Admin</strong>
              </span>
            </p>
          </div>
          <Button className="bg-gradient-to-r from-[#A0653C] to-[#C99A71] rounded-full size-[60px] grid place-items-center">
            <FaShareAlt className="fill-white size-6" />
          </Button>
        </div>
        <div>
          <p className="text-justify text-lg font-medium text-[#2e1a0f]">
            {activityDetail?.content}
          </p>
        </div>
        <div className="flex flex-col relative justify-center items-center w-screen">
          <h1 className="absolute -top-8 rounded-full bg-[#6C4534] text-white font-semibold text-3xl w-fit text-center px-7 py-4 z-10">
            Dokumentasi
          </h1>
          <hr className="h-1 bg-[#6C4534] w-1/2 z-0" />
          <div className="flex justify-center bg-[#EEDAC6] w-full">
            <div className="grid grid-cols-3 gap-3 px-44 py-24 justify-center items-center w-fit">
              {activityDetail.images.map((image) => (
                <div
                  key={image.id}
                  className="relative w-[22rem] h-52 bg-white rounded-2xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)]"
                >
                  <Image
                    src={image.image_url}
                    alt="activity image"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col relative justify-center items-center gap-3">
          <h1 className="rounded-full bg-[#6C4534] text-white font-semibold text-3xl w-fit text-center px-7 py-4 z-10">
            Kegiatan Lainnya
          </h1>
          <hr className="absolute h-1 bg-[#6C4534] w-1/2 z-0 top-8" />
          <Carousel
            className="flex justify-center items-center relative mb-16"
            opts={{ loop: true }}
          >
            <CarouselContent className="flex gap-2 py-10 px-7">
              {programs.map((program: Program) => (
                <CarouselItem
                  key={program.id}
                  className="basis-1/4 w-[300px] h-[200px] flex justify-center items-center relative rounded-2xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)] border-4 border-white"
                >
                  <Link href={`/program/${program.id}`}>
                    <Image
                      src={program.cover_image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPreviousProgram
              variant={'secondary'}
              className="h-12 w-12"
            />
            <CarouselNextProgram variant={'secondary'} className="h-12 w-12" />
          </Carousel>
        </div>
      </div>
    </div>
  ) : (
    <>test</>
  )
}
