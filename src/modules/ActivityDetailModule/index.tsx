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
import { ActivityProps } from '../LandingPageModule/interface'
import ImageGallery from '@/components/elements/ImageGallery'
import { ActivityDetail, ActivityDetailModuleProps } from './interface'

async function getOtherActivities() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/activity`,
    {
      next: { revalidate: 3600 },
    }
  )
  const responseJson = await response.json()
  const programs = await responseJson.contents
  return programs
}

async function getOtherNews() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/news-quotes`,
    {
      next: { revalidate: 3600 },
    }
  )
  const responseJson = await response.json()
  const news = await responseJson.contents
  return news
}

async function getDetail(id: string, type: 'ACTIVITY' | 'NEWS') {
  const activityId = id
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${type === 'NEWS' ? 'news-quotes/news' : type.toLocaleLowerCase()}/${activityId}`,
      {
        next: { revalidate: 60 },
      }
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
  const otherContents =
    type === 'ACTIVITY' ? await getOtherActivities() : await getOtherNews()

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Detail tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-14 items-center mb-20 lg:mb-40">
      <Image
        src={detail.cover_image ?? ''}
        height={658}
        width={1442}
        alt="background image for quotes"
        className="w-full object-cover max-h-[400px]"
      />
      <div className="space-y-[60px] container flex flex-col justify-center items-center">
        <div className="w-full flex justify-between">
          <div className="space-y-4">
            <h2 className="mb-3 text-brown font-bold text-3xl">
              {type === 'ACTIVITY' ? 'Kegiatan' : 'Berita'}
            </h2>
            <h1 className="font-semibold text-5xl">{detail.title}</h1>
            <p className="text-brown italic font-medium text-base space-x-12">
              <span className="items-center space-x-1">
                <FaClock className="inline pb-1 pr-1" />
                Posted on{' '}
                <strong>
                  {new Date(detail.updated_at ?? '').toLocaleDateString(
                    'id-ID',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
                </strong>
              </span>
              {/* Keep author section as is since it's not in the API response */}
              <span className="items-center space-x-1">
                <FaUser className="inline pb-1 pr-1" />
                Posted by
                <strong>{detail.posted_by}</strong>
              </span>
            </p>
          </div>
          <Button className="bg-gradient-to-r from-[#A0653C] to-[#C99A71] rounded-full size-[60px] grid place-items-center">
            <FaShareAlt className="fill-white size-6" />
          </Button>
        </div>
        <div
          className="prose max-w-none text-justify"
          dangerouslySetInnerHTML={{ __html: detail.content }}
        ></div>

        {detail.images && detail.images.length > 0 && (
          <ImageGallery images={detail.images} />
        )}

        <div className="flex flex-col relative justify-center items-center gap-3 w-full">
          <h1 className="rounded-full bg-[#6C4534] text-white font-semibold text-3xl w-fit text-center px-7 py-4 z-10">
            {type === 'ACTIVITY' ? 'Kegiatan Lainnya' : 'Berita Lainnya'}
          </h1>
          <hr className="absolute h-1 bg-[#6C4534] block max-w-screen-lg w-screen z-0 top-8" />
          {
            <Carousel
              className="flex justify-center items-center relative mb-16 w-full px-10 md:px-16"
              opts={{ loop: true }}
            >
              <CarouselContent className="flex gap-2 py-10 px-7">
                {otherContents.map((activity: ActivityProps) => (
                  <CarouselItem
                    key={activity.id}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 w-[300px] h-[200px] flex justify-center items-center relative rounded-2xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)] border-4 border-white"
                  >
                    <Link
                      href={`/${type === 'ACTIVITY' ? 'activity' : 'news-quotes/news'}/${activity.id}`}
                    >
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
                className="h-12 w-12 text-brown"
              />
              <CarouselNextProgram
                variant={'secondary'}
                className="h-12 w-12 text-brown"
              />
            </Carousel>
          }
        </div>
      </div>
    </div>
  )
}
