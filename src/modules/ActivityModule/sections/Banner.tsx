'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const DEFAULT_IMAGE_URL = 'https://picsum.photos/1400/700'

export const Banner = () => {
  const [bannerImageUrl, setBannerImageUrl] = useState(DEFAULT_IMAGE_URL)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/banner/ACTIVITY`
        )
        if (response.ok) {
          const data = await response.json()
          setBannerImageUrl(data.imageUrl)
        } else if (response.status === 404) {
          setBannerImageUrl(DEFAULT_IMAGE_URL)
        }
      } catch (error) {
        console.error('Error fetching banner:', error)
        setBannerImageUrl(DEFAULT_IMAGE_URL)
      }
    }

    fetchBanner()
  }, [])

  return (
    <div className="flex w-full">
      <Image
        src={bannerImageUrl}
        height={536}
        width={1442}
        alt="background image for activity"
        className="object-cover w-1/2 aspect-video max-sm:hidden"
      />
      <div className="max-sm:py-6 w-full sm:w-1/2 bg-brown grid place-items-center text-center">
        <h1 className="text-white1 title-lg font-bold">Kegiatan</h1>
      </div>
    </div>
  )
}
