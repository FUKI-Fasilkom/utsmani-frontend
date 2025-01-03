import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextProgram,
  CarouselPreviousProgram,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { CertificateProps, CertificateSectionProps } from '../interface'

export const CertificateSection: React.FC<CertificateSectionProps> = ({
  certificates,
}) => {
  // Fungsi untuk memformat tanggal "2024-12-29" menjadi "29 Desember 2024"
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

  return (
    <section className="flex flex-col relative  items-center gap-3 bg-[#EEDAC6] min-h-96">
      {/* Heading */}
      <h2 className="rounded-full bg-[#6C4534] text-white font-semibold text-3xl w-fit text-center px-7 py-4 -top-8 relative z-10">
        Sertifikat
      </h2>
      <hr className="absolute h-1 bg-[#6C4534] w-1/2 z-0 -top-0.5" />

      {/* Jika tidak ada sertifikat */}
      {certificates.length === 0 ? (
        <span>Belum ada sertifikat!</span>
      ) : (
        <Carousel
          className="flex justify-center items-center container max-w-screen-lg relative mb-16 "
          opts={{ loop: true }}
        >
          <CarouselContent className="flex w-full gap-2 py-10 px-7">
            {/* Map sertifikat */}
            {certificates.map((certificate: CertificateProps, index) => (
              <CarouselItem
                key={index}
                className="basis-1/4 flex justify-center items-center relative rounded-xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)] border-8 bg-white border-white p-0"
              >
                <button className="w-full h-full flex flex-col items-center">
                  {/* Gambar Sertifikat */}
                  <div className="relative w-full aspect-video">
                    <Image
                      src={certificate.certificate_image}
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
                </button>
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
    </section>
  )
}
