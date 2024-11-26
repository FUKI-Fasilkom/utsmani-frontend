'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ACTIVITY_EXAMPLES } from '../constant'
export const ActivitySection: React.FC = () => {
  /**
   * Bikin dummy gini boleh-boleh aja, tapi better pake constant.ts
   * contohnya: ACTIVITY_EXAMPLES
   */
  let test = []
  const lenData = 10
  for (let i = 0; i < 10; i++) {
    test.push(i)
  }

  // TODO: useState bisa dikasih tipe data valuenya
  const [selected1, setSelected1] = useState<number>(0)
  const [selected2, setSelected2] = useState(1)

  /**
   * Fungsi untuk tombol prev
   */
  const prevBtn = () => {
    if (selected1 > 0) {
      setSelected1(selected1 - 1)
    } else {
      setSelected1(ACTIVITY_EXAMPLES.length - 1)
    }
  }

  /**
   * Fungsi untuk tombol next
   */
  const nextBtn = () => {
    if (selected1 < ACTIVITY_EXAMPLES.length - 1) {
      setSelected1(selected1 + 1)
    } else {
      setSelected1(0)
    }
  }

  /**
   * fungsi refreshCarousel udah gk dibutuhin karena skrng
   * perubahan class nya tinggal cek dari state selected1
   * aja langsung di elementnya
   * (Silahkan cek element carouselnya dibawah 👇👇)
   */
  //   const refreshCarousel = () => {
  //     document
  //       .getElementById(`item-${selected1 - 1}-atas`)
  //       ?.classList.add('rotate-y-30')
  //     document
  //       .getElementById(`item-${selected1}-atas`)
  //       ?.classList.remove('rotate-y-30')
  //     document
  //       .getElementById(`item-${selected1}-atas`)
  //       ?.classList.remove('-rotate-y-30')
  //     document
  //       .getElementById(`item-${selected1 + 1}-atas`)
  //       ?.classList.add('-rotate-y-30')
  //   }

  // TODO: Kalau TODO di dalam useEffect berhasil diimplementasi dengan baik, harusnya useEffect bisa dihapus 👍
  useEffect(() => {
    /**
     * Skrng udah gk butuh ini lagi karena skrng cuma ngandelin state selected1 doang
     */
    // function refreshCarouselAtas() {
    //   document
    //     .getElementById(`item-${selected1 - 1}-atas`)
    //     ?.classList.add('rotate-y-30')
    //   document
    //     .getElementById(`item-${selected1}-atas`)
    //     ?.classList.remove('rotate-y-30')
    //   document
    //     .getElementById(`item-${selected1}-atas`)
    //     ?.classList.remove('-rotate-y-30')
    //   document
    //     .getElementById(`item-${selected1 + 1}-atas`)
    //     ?.classList.add('-rotate-y-30')
    // }
    // refreshCarouselAtas()

    /**
     * fungsi ini bisa diganti dengan cara define function,
     * lalu taro functionnya di onClick element
     */
    // document
    //   .getElementById('previous-button-1')
    //   ?.addEventListener('click', (e) => {
    //     e.preventDefault()
    //   })
    // document.getElementById('next-button-1')?.addEventListener('click', (e) => {
    //   e.preventDefault()
    //   if (selected1 < lenData) {
    //     setSelected1(selected1 + 1)
    //     refreshCarouselAtas()
    //   }
    // })

    // TODO: Jangan pakai fungsi refresh
    function refreshCarouselBawah() {
      document
        .getElementById(`item-${selected2 - 1}-bawah`)
        ?.classList.add('rotate-y-30')
      document
        .getElementById(`item-${selected2}-bawah`)
        ?.classList.remove('rotate-y-30')
      document
        .getElementById(`item-${selected2}-bawah`)
        ?.classList.remove('-rotate-y-30')
      document
        .getElementById(`item-${selected2 + 1}-bawah`)
        ?.classList.add('-rotate-y-30')
    }
    refreshCarouselBawah()

    // TODO: Ganti addEventListener dengan onClick
    document
      .getElementById('previous-button-2')
      ?.addEventListener('click', (e) => {
        e.preventDefault()
        if (selected2 > 1) {
          setSelected2(selected2 - 1)
          refreshCarouselBawah()
        }
      })
    document.getElementById('next-button-2')?.addEventListener('click', (e) => {
      e.preventDefault()
      if (selected2 < lenData) {
        setSelected2(selected2 + 1)
        refreshCarouselBawah()
      }
    })
  }, [selected2, selected1])

  return (
    <section className="w-full flex flex-col px-16 gap-6 justify-center items-center">
      <h1 className="h-[75px] text-[3rem] font-bold leading-normal text-center text-[#6C4534]">
        Kegiatan
      </h1>

      {/* kegiatan atas */}
      <Carousel opts={{ loop: true }} className="w-full relative flex flex-col">
        <CarouselContent className="w-full py-10">
          {ACTIVITY_EXAMPLES.map((activity, index) => (
            <CarouselItem
              className="basis-1/3 w-[444px] h-[304px] flex justify-center items-center perspective-1600 relative"
              key={activity.id}
            >
              <div
                className={`w-full h-full flex justify-center overflow-hidden items-center  transform-style-3d transform-cpu transition-all rounded-[1.25rem] bg-cover 
                    ${
                      index === selected1 - 1 ||
                      (index === ACTIVITY_EXAMPLES.length - 1 &&
                        selected1 === 0)
                        ? 'rotate-y-30'
                        : index === selected1 + 1 ||
                            (index === ACTIVITY_EXAMPLES.length - 2 &&
                              selected1 === ACTIVITY_EXAMPLES.length - 1)
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
        <button onClick={prevBtn}>
          <CarouselPrevious
            size="md"
            className="border-2 bg-[#6C4534] text-white"
            //   id="previous-button-1"
          />
        </button>
        <button onClick={nextBtn}>
          <CarouselNext
            size="md"
            className="border-2 bg-[#6C4534] text-white"
            //   id="next-button-1"
          />
        </button>
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
      <Carousel className="w-full relative flex flex-col">
        <CarouselContent className="w-full py-10">
          {test.map((item) => (
            <CarouselItem
              className="basis-1/3 w-[444px] h-[304px] flex justify-center items-center perspective-1600"
              key={item}
            >
              {/* Bisa coba explore element Image milik nextjs: https://nextjs.org/docs/pages/api-reference/components/image */}
              <div
                className="w-full h-full bg-[url(https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg)] flex justify-center items-center text-white text-justify transform-style-3d transform-cpu transition-all rounded-[1.25rem] bg-cover"
                id={`item-${item}-bawah`}
              >
                {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          size="md"
          className="border-2 bg-[#6C4534] text-white"
          id="previous-button-2"
        />
        <CarouselNext
          size="md"
          className="border-2 bg-[#6C4534] text-white"
          id="next-button-2"
        />
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
      </Carousel>
    </section>
  )
}
