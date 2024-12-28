import Image from 'next/image'
import React from 'react'

export const HeroSection = () => {
  return (
    <section className="flex justify-between w-full h-[400px] bg-brown">
      <Image
        src="/assets/images/berwakaf.jpeg"
        alt="Donasi Peduli Gempa Cianjur Al-Utsmani"
        width={1920}
        height={1080}
        className="w-1/2 h-full object-cover"
      />
      <div className="w-1/2 flex justify-center items-center">
        <h1 className="text-[80px] text-white1 font-bold text-center">
          WAKAF <br />
          Al-Utsmani
        </h1>
      </div>
    </section>
  )
}
