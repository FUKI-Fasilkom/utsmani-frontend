import React from 'react'
import Image from 'next/image'

export const Banner = () => {
  return (
    <div className="flex w-full">
      <Image
        src={'https://picsum.photos/1400/700'}
        height={536}
        width={1442}
        alt="background image for activity"
        className=" object-cover max-h-[536px] min-h-[300px] w-1/2 max-sm:hidden"
      />
      <div className="max-sm:py-6 w-full sm:w-1/2 bg-brown grid place-items-center text-center">
        <h1 className="text-white1 title-lg font-bold">Kegiatan</h1>
      </div>
    </div>
  )
}
