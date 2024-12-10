import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { FaShareAlt, FaClock, FaUser, FaQuoteLeft } from 'react-icons/fa'

export const QuoteDetailModule: React.FC = async () => {
  return (
    <div className="flex flex-col gap-14 items-center w-full mb-20 lg:mb-40">
      <Image
        src={'https://picsum.photos/1400/700'}
        height={658}
        width={1442}
        alt="backgorund image for quotes"
        className="w-full object-cover max-h-[400px]"
      />
      <div className="space-y-[60px] w-full container">
        <div className="flex justify-between">
          <div className="space-y-4">
            <h2 className="mb-3 text-brown font-bold text-3xl">Quotes</h2>
            <h1 className="font-semibold text-5xl">
              Penuh Hati dengan Al-Quran
            </h1>
            <p className="text-brown italic font-medium text-base space-x-12">
              <span className="items-center space-x-1">
                <FaClock className="inline pb-1 pr-1" />
                Posted on <strong>12 August 2024</strong>
              </span>
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
        <div className="w-full flex justify-center">
          <div className="relative px-4 md:px-20 lg:px-40">
            <div className="bg-white rounded-full size-16 grid place-items-center absolute -top-[30px] left-1/2 transform -translate-x-1/2 shadow-md shadow-black">
              <FaQuoteLeft className="fill-black size-[30px]" />
            </div>
            <div className="bg-brown rounded-[32px] flex flex-col justify-center items-center py-12 gap-[20px] text-white1 text-center px-16 italic text-2xl lg:text-3xl">
              <q className="font-semibold">
                Sesungguhnya Hati ini adalah wadah, maka penuhilah ia dengan
                Al-Qur’an dan jangan penuhi dengan lainnya. Sesungguhnya Hati
                ini adalah wadah, maka penuhilah ia dengan Al-Qur’an dan jangan
                penuhi dengan lainnya.
              </q>
              <div className="h-0.5 w-4 bg-white1"> </div>
              <p className="font-light"> -Abdullah Bin Mas’ud</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-justify text-lg font-medium text-[#2e1a0f]">
            Lorem ipsum dolor sit amet consectetur. Scelerisque risus vel lectus
            at enim. Nunc leo eu tristique ipsum nunc quis penatibus. Consequat
            eleifend quam phasellus nunc lacus netus massa. Egestas ac
            vestibulum viverra pretium risus. A diam a elementum sed. Nisl quis
            enim vulputate velit ornare. Risus sit cras ultricies placerat.
            Lorem fusce pharetra nunc sed blandit arcu mauris. Tristique sed non
            non diam pulvinar lacus turpis. Vel sem id elementum nisi arcu.
            Vehicula etiam tellus a fames. Risus diam gravida lacus faucibus
            sapien. Facilisi viverra praesent amet integer arcu tristique. Risus
            dignissim ut quis lacinia rhoncus dolor pellentesque laoreet. Sit
            ultricies et et porttitor vitae. Nisi varius nibh velit nunc egestas
            non neque arcu convallis. Ac donec congue vestibulum mauris
            ultricies aenean. Metus tincidunt pulvinar eu suscipit habitant
            molestie sagittis sodales. In pretium pharetra a sit diam massa in
            vulputate.
          </p>
        </div>
      </div>
    </div>
  )
}
