import React from 'react'
import Image from 'next/image'
import { FaClock } from 'react-icons/fa'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextProgram,
  CarouselPreviousProgram,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { ProgramProps } from '../LandingPageModule/interface'
import ImageGallery from '@/components/elements/ImageGallery'
import { BranchDetail } from './interface'

type BranchDetailModuleProps = {
  id: string
}

async function getDetail(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/branch/${id}`,
      {
        next: { revalidate: 60 },
      }
    )
    const responseJson = await response.json()
    return (await responseJson.contents) as BranchDetail
  } catch (error) {
    console.log('Error fetching program detail:', error)
  }
}

async function getRelatedPrograms(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/branch/${id}`,
      {
        next: { revalidate: 60 },
      }
    )
    const responseJson = await response.json()
    return (await responseJson.contents) as ProgramProps[]
  } catch (error) {
    console.log('Error fetching programs:', error)
    return []
  }
}

export const BranchDetailModule: React.FC<BranchDetailModuleProps> = async ({
  id,
}) => {
  const detail = await getDetail(id)
  const relatedPrograms = await getRelatedPrograms(id)

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
        src={detail.cover_image}
        height={658}
        width={1442}
        alt="background image for quotes"
        className="w-full object-cover max-h-[400px]"
      />
      <div className="space-y-[60px] container flex flex-col justify-center items-center">
        <div className="space-y-4 w-full">
          <h2 className="mb-3 text-brown font-bold heading-4">
            Cabang Al-Utsmani
          </h2>
          <h1 className="font-semibold heading-2">{detail.name}</h1>
          <p className="text-brown italic font-medium text-base space-x-12">
            <span className="items-center space-x-1">
              <FaClock className="inline pb-1 pr-1" />
              Posted on
              <strong>
                {new Date(detail.updated_at ?? '').toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </strong>
            </span>
          </p>
        </div>

        <div className="prose max-w-none text-justify xl:w-2/3">
          <div dangerouslySetInnerHTML={{ __html: detail.description }}></div>
        </div>

        {detail.map_address_link && (
          <div className="w-full flex flex-col relative items-center px-10">
            <h2 className="rounded-full heading-4 bg-brown text-white w-fit text-center px-6 py-2 z-10 mb-6">
              Lokasi
            </h2>
            <hr className="block max-w-screen-lg w-screen absolute h-1 bg-brown z-0 top-6 " />
            <iframe
              src={detail.map_address_link}
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full max-w-screen-md rounded-[20px] mb-[24px]"
            ></iframe>
          </div>
        )}

        {detail.images && detail.images.length > 0 && (
          <ImageGallery images={detail.images} title="Galeri" />
        )}

        <div className="flex flex-col relative justify-center items-center gap-3 w-full">
          <h1 className="rounded-full bg-[#6C4534] text-white font-semibold heading-4 w-fit text-center px-7 py-4 z-10">
            Program Tersedia
          </h1>
          <hr className="block max-w-screen-lg w-screen absolute h-1 bg-[#6C4534] z-0 top-8" />
          <Carousel className="w-full px-6 mt-10" opts={{ align: 'start' }}>
            <CarouselContent className="flex w-full">
              {relatedPrograms.map((program: ProgramProps) => (
                <CarouselItem
                  key={program.id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
                >
                  <Link
                    href={`/program/${program.id}`}
                    className="w-full aspect-square border-2 border-brown rounded-[40px] overflow-hidden flex items-center justify-center relative shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)]"
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
                          'linear-gradient(to top, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0) 100%)',
                      }}
                    >
                      <span className="font-medium heading-6 text-center text-white drop-shadow-md">
                        {program.title}
                      </span>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPreviousProgram
              variant={'secondary'}
              className="ml-10 md:ml-5"
            />
            <CarouselNextProgram
              variant={'secondary'}
              className="mr-10 md:mr-5"
            />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
