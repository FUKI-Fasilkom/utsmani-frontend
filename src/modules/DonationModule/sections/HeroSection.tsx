import Image from 'next/image'
import React from 'react'

type HeroSectionProps = {
  banner?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ banner }) => {
  return (
    <section className="flex justify-between w-full h-[160px] md:h-[320px] lg:h-[400px] bg-brown">
      <Image
        src={banner || '/assets/images/berwakaf.jpeg'}
        alt="Donasi Peduli Gempa Cianjur Al-Utsmani"
        width={1920}
        height={1080}
        className="w-1/2 h-full object-cover"
      />
      <div className="w-1/2 flex justify-center items-center">
        <h1 className="text-[28px] md:text-[48px] lg:text-[80px] text-white1 font-bold text-center">
          WAKAF <br />
          Al-Utsmani
        </h1>
      </div>
    </section>
  )
}
