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
import { ActivityProps, ProgramProps } from '../LandingPageModule/interface'

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
  programs: { id: string; title: string; cover_image: string; name: string }[]
}

type ActivityDetailModuleProps = {
  id: string
  type: 'BRANCH' | 'ACTIVITY' | 'NEWS'
}

async function getOtherActivities() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/activity`
  )
  const responseJson = await response.json()
  const programs = await responseJson.contents
  return programs
}

async function getDetail(id: string, type: 'BRANCH' | 'ACTIVITY' | 'NEWS') {
  const activityId = id
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${type === 'NEWS' ? 'news-quotes/news' : type.toLocaleLowerCase()}/${activityId}`
    )
    const responseJson = await response.json()
    const detail = (await responseJson.contents) as ActivityDetail

    return detail
  } catch (error) {
    console.log('Error fetching program detail:', error)
  }
}

export const ActivityDetailModule: React.FC<
  ActivityDetailModuleProps
> = async ({ id, type }) => {
  const detail = await getDetail(id, type)
  const activities = await getOtherActivities()
  return (
    <div className="flex flex-col gap-14 items-center mb-20 lg:mb-40">
      <Image
        src={detail?.cover_image ?? ''}
        height={658}
        width={1442}
        alt="background image for quotes"
        className="w-full object-cover max-h-[400px]"
      />
      <div className="space-y-[60px] container flex flex-col justify-center items-center">
        <div className="w-full flex justify-between">
          <div className="space-y-4">
            <h2 className="mb-3 text-brown font-bold text-3xl">
              {type === 'BRANCH'
                ? 'Cabang Al-Utsmani'
                : type === 'ACTIVITY'
                  ? 'Kegiatan'
                  : 'Berita'}
            </h2>
            <h1 className="font-semibold text-5xl">{detail?.title}</h1>
            <p className="text-brown italic font-medium text-base space-x-12">
              <span className="items-center space-x-1">
                <FaClock className="inline pb-1 pr-1" />
                Posted on{' '}
                <strong>
                  {new Date(detail?.created_at ?? '').toLocaleDateString(
                    'id-ID'
                  )}
                </strong>
              </span>
              {/* Keep author section as is since it's not in the API response */}
              <span className="items-center space-x-1">
                <FaUser className="inline pb-1 pr-1" />
                Posted by
                <strong>Admin</strong>
              </span>
            </p>
          </div>
          <Button className="bg-gradient-to-r from-[#A0653C] to-[#C99A71] rounded-full size-[60px] grid place-items-center">
            <FaShareAlt className="fill-white size-6" />
          </Button>
        </div>
        <div>
          <p className="text-justify text-lg font-medium text-[#2e1a0f]">
            {detail?.content}
          </p>
        </div>
        <div className="flex flex-col relative justify-center items-center w-screen">
          <h1 className="absolute -top-8 rounded-full bg-[#6C4534] text-white font-semibold text-3xl w-fit text-center px-7 py-4 z-10">
            Dokumentasi
          </h1>
          <hr className="h-1 bg-[#6C4534] w-1/2 z-0" />
          <div className="flex justify-center bg-[#EEDAC6] w-full">
            <div className="grid grid-cols-3 gap-3 px-44 py-24 justify-center items-center w-fit">
              {detail?.images?.map((image) => (
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
        <div className="flex flex-col relative justify-center items-center gap-3 w-full">
          {' '}
          {/* Added w-full for carousel to take width */}
          <h1 className="rounded-full bg-[#6C4534] text-white font-semibold text-3xl w-fit text-center px-7 py-4 z-10">
            {type === 'BRANCH' ? 'Program Tersedia' : 'Kegiatan Lainnya'}
          </h1>
          <hr className="absolute h-1 bg-[#6C4534] w-1/2 z-0 top-8" />
          {type === 'BRANCH' ? (
            <Carousel
              className="w-full flex justify-center items-center relative mb-16 px-10 md:px-16" // Added padding for prev/next buttons
              opts={{ loop: true }}
            >
              <CarouselContent className="flex gap-4 py-10 px-2">
                {' '}
                {/* Adjusted gap and padding */}
                {detail?.programs.map((program: ProgramProps, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center" // Responsive basis
                  >
                    <Link
                      href={`/program/${program.id}`}
                      className="w-[240px] h-[240px] border-2 border-brown rounded-[40px] overflow-hidden flex items-center justify-center relative shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)]"
                    >
                      <Image
                        src={program.cover_image}
                        alt={program.title}
                        className="object-cover w-full h-full"
                        width={288}
                        height={272}
                      />
                      <div
                        className="py-4 px-2 absolute bottom-0 w-full flex justify-center"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0) 100%)', // Slightly darker gradient
                        }}
                      >
                        <span className="font-bold text-xl text-center text-white drop-shadow-md">
                          {' '}
                          {/* Adjusted text size and added drop shadow */}
                          {program.title}
                        </span>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPreviousProgram
                variant={'secondary'}
                className="h-12 w-12 text-brown" // Added text color
              />
              <CarouselNextProgram
                variant={'secondary'}
                className="h-12 w-12 text-brown" // Added text color
              />
            </Carousel>
          ) : (
            <Carousel
              className="flex justify-center items-center relative mb-16 w-full px-10 md:px-16" // Added w-full and padding
              opts={{ loop: true }}
            >
              <CarouselContent className="flex gap-2 py-10 px-7">
                {activities.map((activity: ActivityProps) => (
                  <CarouselItem
                    key={activity.id}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 w-[300px] h-[200px] flex justify-center items-center relative rounded-2xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)] border-4 border-white"
                  >
                    <Link href={`/activity/${activity.id}`}>
                      <Image
                        src={activity.cover_image}
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
                className="h-12 w-12 text-brown" // Added text color
              />
              <CarouselNextProgram
                variant={'secondary'}
                className="h-12 w-12 text-brown" // Added text color
              />
            </Carousel>
          )}
        </div>
      </div>
    </div>
  )
}
