import React from 'react'
import { CATEGORY_MENU } from '../constant'
import Link from 'next/link'

export const CategorySection = () => {
  return (
    <section className="container text-brown flex flex-col items-center py-8 md:py-12 lg:py-16 gap-y-4 md:gap-y-8 lg:gap-y-10">
      <h2 className="font-bold text-lg md:text-[40px]">
        Pilih Kategori Wakafmu
      </h2>
      <div className="flex justify-center gap-6 md:gap-20">
        {CATEGORY_MENU.map((category) => (
          <div key={category.path} className="w-[64px] md:w-[160px]">
            <Link href={category.path}>
              <div className="bg-brown rounded-full aspect-square flex justify-center items-center drop-shadow-xl p-2 md:p-6">
                <category.icon className="w-full h-full" />
              </div>
              <span className="inline-block w-full font-semibold text-sm md:text-base lg:text-[24px] text-center mt-2 text-wrap">
                {category.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
