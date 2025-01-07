import Image from 'next/image'
import React from 'react'
import { FaClock, FaUser, FaQuoteLeft } from 'react-icons/fa'
import { ShareButton } from './module-elements/ShareButton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { QuoteItem } from './interface'

const getQuoteDetail = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/news-quotes/quotes/${id}`
  )
  const data = await response.json()
  return data
}

export const QuoteDetailModule: React.FC<{ id: string }> = async ({ id }) => {
  const { contents } = await getQuoteDetail(id)

  return (
    <div className="flex flex-col gap-14 items-center w-full mb-20 lg:mb-40">
      <Image
        src={contents.cover_image}
        height={658}
        width={1442}
        alt="background image for quotes"
        className="w-full object-cover max-h-[400px]"
      />
      <div className="space-y-[60px] w-full container">
        <div className="flex justify-between">
          <div className="space-y-4">
            <h2 className="mb-3 text-brown font-bold text-2xl xl:text-3xl">
              Quotes
            </h2>
            <h1 className="font-semibold text-4xl xl:text-5xl">
              {contents.title}
            </h1>
            <div className="text-brown italic font-medium text-base gap-x-12 gap-y-px flex flex-col sm:flex-row">
              <span className="items-center space-x-1">
                <FaClock className="inline pb-1 pr-1" />
                Posted on{' '}
                <strong>
                  {new Date(contents.updated_at).toLocaleDateString('id-ID')}
                </strong>
              </span>
              <span className="items-center space-x-1">
                <FaUser className="inline pb-1 pr-1" />
                Posted by
                <strong>Nama Admin</strong>
              </span>
            </div>
          </div>
          <ShareButton />
        </div>

        <Carousel
          className="w-full"
          opts={{
            align: 'center',
          }}
        >
          <CarouselContent className="-ml-0">
            {contents.items.map((item: QuoteItem) => (
              <CarouselItem key={item.id} className="pl-0 w-full pt-[30px]">
                <div className="w-full flex justify-center">
                  <div className="relative px-4 md:px-20 lg:px-40 w-full">
                    <div className="bg-white rounded-full size-12 xl:size-16 grid place-items-center absolute -top-[24px] left-1/2 transform -translate-x-1/2 shadow-md shadow-black z-10">
                      <FaQuoteLeft className="fill-black size-[16px] xl:size-[30px]" />
                    </div>
                    <div
                      className="bg-brown rounded-[32px] flex flex-col justify-center items-center py-6 md:py-8 xl:py-12 gap-[20px] text-white1 text-center px-8 md:px-12 xl:px-16 italic text-xl md:text-2xl xl:text-3xl relative"
                      style={{
                        backgroundImage: `url(${item.bg_image})`,
                        backgroundSize: 'cover',
                        backgroundBlendMode: 'overlay',
                      }}
                    >
                      <q className="font-semibold">{item.quote_text}</q>
                      <div className="h-0.5 w-4 bg-white1"> </div>
                      <p className="font-light"> -{item.author}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-[10%] mt-[30px] size-8 md:size-10 xl:size-12">
            Prev
          </CarouselPrevious>
          <CarouselNext className="mr-[10%] mt-[30px] size-8 md:size-10 xl:size-12">
            Next
          </CarouselNext>
        </Carousel>

        <div>
          <p className="text-justify text-base md:text-lg font-medium text-[#2e1a0f]">
            {contents.description}
          </p>
        </div>
      </div>
    </div>
  )
}
