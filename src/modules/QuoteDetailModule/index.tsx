import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { FaShareAlt, FaClock, FaUser, FaQuoteLeft } from 'react-icons/fa'
// import { format } from 'date-fns'
import { QuoteDetailResponse } from './interface'

const getQuoteDetail = async (id: string): Promise<QuoteDetailResponse> => {
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
            <h2 className="mb-3 text-brown font-bold text-3xl">Quotes</h2>
            <h1 className="font-semibold text-5xl">{contents.title}</h1>
            <p className="text-brown italic font-medium text-base space-x-12">
              <span className="items-center space-x-1">
                <FaClock className="inline pb-1 pr-1" />
                Posted on{' '}
                <strong>
                  {new Date(contents.updated_at).toLocaleDateString('id-ID')}
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
        {contents.items.map((item) => (
          <div key={item.id} className="w-full flex justify-center">
            <div className="relative px-4 md:px-20 lg:px-40">
              <div className="bg-white rounded-full size-16 grid place-items-center absolute -top-[30px] left-1/2 transform -translate-x-1/2 shadow-md shadow-black">
                <FaQuoteLeft className="fill-black size-[30px]" />
              </div>
              <div
                className="bg-brown rounded-[32px] flex flex-col justify-center items-center py-12 gap-[20px] text-white1 text-center px-16 italic text-2xl lg:text-3xl"
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
        ))}
        <div>
          <p className="text-justify text-lg font-medium text-[#2e1a0f]">
            {contents.description}
          </p>
        </div>
      </div>
    </div>
  )
}
