'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export const Banner = () => {
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/1400/700') // Default image URL

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/banner/NEWS`
        )
        if (response.status === 404) {
          // Use default image if API returns 404
          setImageUrl('https://picsum.photos/1400/700')
        } else if (response.ok) {
          const data = await response.json()
          setImageUrl(data.imageUrl)
        }
      } catch (error) {
        console.error('Error fetching banner:', error)
        // Fallback to default image in case of error
        setImageUrl('https://picsum.photos/1400/700')
      }
    }

    fetchBanner()
  }, [])

  return (
    <div className="flex w-full">
      <div className="max-sm:py-16 w-full sm:w-1/2 bg-brown grid place-items-center text-center">
        <h1 className="text-white1 text-5xl md:text-7xl xl:text-8xl font-bold">
          Berita & Quotes
        </h1>
      </div>

      <Image
        src={imageUrl}
        height={536}
        width={1442}
        alt="background image for quotes"
        className="object-cover w-1/2 aspect-video max-sm:hidden"
      />
    </div>
  )
}
