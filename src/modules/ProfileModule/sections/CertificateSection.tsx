'use client'

import type React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextProgram,
  CarouselPreviousProgram,
} from '@/components/ui/carousel'
import Image from 'next/image'
import type { CertificateProps, CertificateSectionProps } from '../interface'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const CertificateSection: React.FC<CertificateSectionProps> = ({
  certificates,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedImages, setSelectedImages] = useState<{
    urls: string[]
    title: string
    type: 'certificate' | 'report'
    currentIndex: number
  } | null>(null)

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Tidak tersedia'
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
    return new Intl.DateTimeFormat('id-ID', options).format(
      new Date(dateString)
    )
  }

  const handleImageView = (
    certificate: CertificateProps,
    type: 'certificate' | 'report'
  ) => {
    const imageUrls =
      type === 'certificate'
        ? certificate.certificate_images || ['/placeholder.svg']
        : certificate.report_files || ['/placeholder.svg']

    setSelectedImages({
      urls: imageUrls,
      title: certificate.title,
      type: type,
      currentIndex: 0,
    })
    setIsDialogOpen(true)
  }

  const nextImage = () => {
    if (selectedImages) {
      setSelectedImages({
        ...selectedImages,
        currentIndex:
          (selectedImages.currentIndex + 1) % selectedImages.urls.length,
      })
    }
  }

  const prevImage = () => {
    if (selectedImages) {
      setSelectedImages({
        ...selectedImages,
        currentIndex:
          (selectedImages.currentIndex - 1 + selectedImages.urls.length) %
          selectedImages.urls.length,
      })
    }
  }

  return (
    <section className="flex flex-col relative items-center gap-3 bg-[#EEDAC6] min-h-96">
      {/* Heading */}
      <h2 className="rounded-full bg-[#6C4534] text-white font-semibold text-3xl w-fit text-center px-7 py-4 -top-8 relative z-10">
        Sertifikat & Rapor
      </h2>
      <hr className="absolute h-1 bg-[#6C4534] w-1/2 z-0 -top-0.5" />

      {/* Jika tidak ada sertifikat */}
      {certificates.length === 0 ? (
        <span>Belum ada sertifikat!</span>
      ) : (
        <Carousel
          className="flex justify-center items-center container max-w-screen-lg relative mb-16"
          opts={{ loop: true }}
        >
          <CarouselContent className="flex w-full gap-2 py-10 px-7">
            {/* Map sertifikat */}
            {certificates.map((certificate: CertificateProps, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 flex justify-center items-center relative rounded-xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)] border-8 bg-white border-white p-0"
              >
                <div className="w-full h-full flex flex-col items-center">
                  {/* Gambar Sertifikat */}
                  <div className="relative w-full aspect-video">
                    <Image
                      src={
                        certificate.certificate_images?.[0] ||
                        '/placeholder.svg'
                      }
                      alt={certificate.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Judul dan Tanggal */}
                  <h3 className="font-semibold text-lg mt-3 text-[#6C4534]">
                    {certificate.title}
                  </h3>
                  <span className="text-sm text-gray-600">
                    Didapat {formatDate(certificate.obtained_at)}
                  </span>

                  {/* Buttons for viewing certificate or report */}
                  <div className="flex gap-2 mt-3 mb-4">
                    {certificate.certificate_images?.length > 0 && (
                      <Button
                        variant="secondary"
                        size={'sm'}
                        onClick={() =>
                          handleImageView(certificate, 'certificate')
                        }
                      >
                        Lihat Sertifikat
                      </Button>
                    )}
                    {certificate.report_files &&
                      certificate.report_files?.length > 0 && (
                        <Button
                          variant="secondary"
                          size={'sm'}
                          onClick={() => handleImageView(certificate, 'report')}
                        >
                          Lihat Rapor
                        </Button>
                      )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Tombol Carousel */}
          <CarouselPreviousProgram
            variant={'secondary'}
            className="h-12 w-12"
          />
          <CarouselNextProgram variant={'secondary'} className="h-12 w-12" />
        </Carousel>
      )}

      {/* Full Screen Dialog - Moved outside the map */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="max-w-full max-h-full w-screen h-screen p-0 border-none bg-transparent">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Title and Close button container */}
            <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-4 z-50">
              <DialogTitle className="text-white bg-[#6C4534]/90 px-6 py-3 rounded-full text-lg font-semibold">
                {selectedImages?.type === 'certificate'
                  ? 'Sertifikat'
                  : 'Rapor'}{' '}
                - {selectedImages?.title}{' '}
                {selectedImages &&
                  selectedImages.urls.length > 1 &&
                  `(${selectedImages.currentIndex + 1}/${selectedImages.urls.length})`}
              </DialogTitle>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Image viewer */}
            {selectedImages && (
              <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={
                      selectedImages.urls[selectedImages.currentIndex] ||
                      '/placeholder.svg'
                    }
                    alt={`${selectedImages.title} - ${selectedImages.type === 'certificate' ? 'Sertifikat' : 'Rapor'}`}
                    className="object-contain"
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                </div>

                {/* Navigation buttons for multiple images */}
                {selectedImages.urls.length > 1 && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                    <Button
                      variant="secondary"
                      onClick={prevImage}
                      className="bg-brown/80 hover:bg-brown"
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={nextImage}
                      className="bg-brown/80 hover:bg-brown"
                    >
                      Berikutnya
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
