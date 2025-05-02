'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { useState } from 'react'
import { ActivitySectionProps } from '../interface'
import Link from 'next/link'

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities,
}) => {
  let test = []
  for (let i = 0; i < activities.length; i++) {
    test.push(i)
  }
  // TODO: useState bisa dikasih tipe data valuenya
  const [selected1, setSelected1] = useState<number>(0)
  //   const [selected2, setSelected2] = useState<number>(0)

  /**
   * Fungsi untuk tombol prev
   */
  const prevBtn = () => {
    if (selected1 > 0) {
      setSelected1(selected1 - 1)
    } else {
      setSelected1(activities.length - 1)
    }
  }
  //   const prevBtn2 = () => {
  //     if (selected2 > 0) {
  //       setSelected2(selected2 - 1)
  //     } else {
  //       setSelected2(ACTIVITY_EXAMPLES.length - 1)
  //     }
  //   }

  /**
   * Fungsi untuk tombol next
   */
  const nextBtn = () => {
    if (selected1 < activities.length - 1) {
      setSelected1(selected1 + 1)
    } else {
      setSelected1(0)
    }
  }
  //   const nextBtn2 = () => {
  //     if (selected2 < ACTIVITY_EXAMPLES.length - 1) {
  //       setSelected2(selected2 + 1)
  //     } else {
  //       setSelected2(0)
  //     }
  //   }

  return (
    <section className="w-full flex flex-col px-16 gap-3 lg:gap-6 justify-center items-center">
      <h1 className="text-center text-[#6C4534] heading-2 font-bold">
        Kegiatan
      </h1>

      {/* kegiatan atas */}
      <Carousel opts={{ loop: true }} className="w-full relative flex flex-col">
        <CarouselContent className="w-full py-10">
          {activities.map((activity) => (
            <CarouselItem
              className="basis-full md:basis-1/2 lg:basis-1/3 w-[444px] h-[304px] flex justify-center items-center perspective-1600 relative group"
              key={activity.id}
            >
              <Link
                href={`/activity/${activity.id}`}
                className={`w-full h-full flex justify-center overflow-hidden items-center transform-style-3d transform-cpu transition-all rounded-[1.25rem] bg-cover`}
              >
                <Image
                  src={activity.cover_image}
                  alt="Aktifitas"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-lg text-center">
                    {activity.title}
                  </span>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div onClick={prevBtn}>
          <CarouselPrevious
            size="md"
            className="border-2 bg-[#6C4534] text-white"
            //   id="previous-button-1"
          />
        </div>
        <div onClick={nextBtn}>
          <CarouselNext
            size="md"
            className="border-2 bg-[#6C4534] text-white"
            //   id="next-button-1"
          />
        </div>
        <div className="w-full flex gap-2 justify-center items-center">
          <div className="w-1/3 rounded-full justify-center items-center flex gap-3">
            {test.map((item) =>
              item == selected1 ? (
                <div
                  className="w-2 h-2 rounded-full bg-gray-700"
                  key={item}
                ></div>
              ) : (
                <div
                  className="w-2 h-2 rounded-full bg-gray-300"
                  key={item}
                ></div>
              )
            )}
          </div>
        </div>
      </Carousel>

      {/* kegiatan bawah */}
      {/* <Carousel
        opts={{ loop: true }}
        className="w-full max-w-screen-2xl relative flex flex-col"
      >
        <CarouselContent className="w-full py-10">
          {ACTIVITY_EXAMPLES.map((activity, index) => (
            <CarouselItem
              className="basis-1/3 w-[444px] h-[304px] flex justify-center items-center perspective-1600 relative"
              key={activity.id}
            >
              <div
                className={`w-full h-full flex justify-center overflow-hidden items-center  transform-style-3d transform-cpu transition-all rounded-[1.25rem] bg-cover 
                    ${
                      index === selected2 - 1 || // Untuk slide sebelum
                      (index === ACTIVITY_EXAMPLES.length - 1 &&
                        selected2 === 0) // Untuk slide sebelum, tapi posisi selected1 di index paling awal
                        ? 'rotate-y-30'
                        : index === selected2 + 1 || // Untuk slide setelah
                            (index === ACTIVITY_EXAMPLES.length - 2 &&
                              selected2 === ACTIVITY_EXAMPLES.length - 1) // Untuk slide setelah, tapi posisi selected di index terakhir
                          ? '-rotate-y-30'
                          : ''
                    }`}
              >
                <Image
                  src={activity.image_url}
                  alt="Aktifitas"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div onClick={prevBtn2}>
          <CarouselPrevious
            size="md"
            className="border-2 bg-[#6C4534] text-white"
            //   id="previous-button-1"
          />
        </div>
        <div onClick={nextBtn2}>
          <CarouselNext
            size="md"
            className="border-2 bg-[#6C4534] text-white"
            //   id="next-button-1"
          />
        </div>
        <div className="w-full flex gap-2 justify-center items-center">
          <div className="w-1/3 rounded-full justify-center items-center flex gap-3">
            {test.map((item) =>
              item == selected2 ? (
                <div
                  className="w-2 h-2 rounded-full bg-gray-700"
                  key={item}
                ></div>
              ) : (
                <div
                  className="w-2 h-2 rounded-full bg-gray-300"
                  key={item}
                ></div>
              )
            )}
          </div>
        </div>
      </Carousel> */}
    </section>
  )
}
