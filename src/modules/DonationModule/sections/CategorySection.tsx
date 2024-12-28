import React from 'react'
import { CATEGORY_MENU } from '../constant'
import Link from 'next/link'

export const CategorySection = () => {
  return (
    <section className="container text-brown flex flex-col items-center py-16 gap-y-10">
      <h2 className="font-bold text-[40px]">Pilih Kategori Wakafmu</h2>
      <div className="flex justify-center gap-20">
        {CATEGORY_MENU.map((category) => (
          <div key={category.path} className="w-[160px]">
            <Link href={category.path}>
              <div className="bg-brown rounded-full aspect-square flex justify-center items-center drop-shadow-xl">
                <category.icon />
              </div>
              <span className="inline-block w-full font-semibold text-[24px] text-center mt-2">
                {category.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
