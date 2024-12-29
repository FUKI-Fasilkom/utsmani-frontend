import React from 'react'
import Image from 'next/image'

export const StructureSection = () => {
  return (
    <section>
      <h2 className="font-bold text-[36px] text-center text-[#6C4534]">
        Struktur Organisasi
      </h2>
      <Image
        src="/assets/images/struktur-organisasi.jpg"
        width={2480}
        height={3508}
        alt="Struktur Organisasi"
      />
    </section>
  )
}
