'use client'

import { useState, useEffect } from 'react'
import type React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

interface ImageData {
  id: string
  image_url: string
}

interface ImageGalleryProps {
  images: ImageData[]
  title?: string
}

export default function ImageGallery({
  images,
  title = 'Dokumentasi',
}: ImageGalleryProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>()

  const openGallery = (index: number) => {
    setCurrentImageIndex(index)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }
  useEffect(() => {
    if (!thumbnailApi) return
    if (thumbnailApi.selectedScrollSnap() !== currentImageIndex) {
      thumbnailApi.scrollTo(currentImageIndex)
    }
  }, [currentImageIndex, thumbnailApi])

  useEffect(() => {
    if (!thumbnailApi) return
    const onSelect = () => {
      setCurrentImageIndex(thumbnailApi.selectedScrollSnap())
    }
    thumbnailApi.on('select', onSelect)
    return () => {
      thumbnailApi.off('select', onSelect)
    }
  }, [thumbnailApi])

  return (
    <>
      <div className="flex flex-col relative justify-center items-center w-screen">
        <h1 className="absolute -top-8 rounded-full bg-[#6C4534] text-white font-semibold heading-4 w-fit text-center px-7 py-4 z-10">
          {title}
        </h1>
        <hr className="block max-w-screen-lg mx-auto w-screen h-1 bg-[#6C4534] z-0" />
        <div className="flex justify-center items-center bg-[#EEDAC6] py-16 w-full px-4">
          <Carousel
            opts={{
              align: 'center',
            }}
            className="container w-full max-w-screen-xl"
          >
            <CarouselContent className="">
              {images.map((image, index) => (
                <CarouselItem
                  key={image.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <div
                      className="relative w-full h-52 bg-white rounded-2xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)] cursor-pointer hover:shadow-[4px_4px_12px_6px_rgba(0,0,0,0.2)] transition-shadow duration-300 group"
                      onClick={() => openGallery(index)}
                    >
                      <Image
                        src={image.image_url || '/placeholder.svg'}
                        alt={`Activity image ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-2">
                          <svg
                            className="w-6 h-6 text-[#6C4534]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-10 md:ml-5" variant={'secondary'} />
            <CarouselNext className="mr-10 md:mr-5" variant={'secondary'} />
          </Carousel>
        </div>
      </div>

      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-end pb-4"
          onClick={closeGallery}
          style={{ marginTop: '0' }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-60 text-white hover:bg-white hover:bg-opacity-20"
            onClick={closeGallery}
          >
            <X className="h-6 w-6" />
          </Button>

          <div
            className="relative w-full h-full max-w-4xl max-h-[calc(100vh-150px)] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentImageIndex]?.image_url || '/placeholder.svg'}
              alt={`Gallery image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Carousel Navigation */}
          {images.length > 1 && (
            <div
              className="w-full max-w-sm md:max-w-md lg:max-w-lg mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Carousel
                setApi={setThumbnailApi}
                opts={{ align: 'center' }}
                className="w-full"
              >
                <CarouselContent className="px-4">
                  {images.map((image, index) => (
                    <CarouselItem
                      key={image.id}
                      className="basis-1/4 md:basis-1/5 px-2"
                    >
                      <div className="p-1" onClick={() => goToImage(index)}>
                        <div
                          className={`relative w-full h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                            index === currentImageIndex
                              ? 'border-[#6C4534] scale-110'
                              : 'border-transparent opacity-60 hover:opacity-100 hover:border-white'
                          }`}
                        >
                          <Image
                            src={image.image_url || '/placeholder.svg'}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  className="ml-10 md:ml-5"
                  variant={'secondary'}
                />
                <CarouselNext className="mr-10 md:mr-5" variant={'secondary'} />
              </Carousel>
            </div>
          )}
        </div>
      )}
    </>
  )
}
