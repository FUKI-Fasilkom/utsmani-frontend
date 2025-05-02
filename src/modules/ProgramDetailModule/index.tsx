'use client'
import Image from 'next/image'
import { PERSYARATAN, MASA_BIMBINGAN, JENJANG_MUSTAWA } from './constant'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { getCookie, deleteCookie } from 'cookies-next'
import { CustomButton } from './module-elements/CustomButton'
import {
  ProgramDetailModuleProps,
  ProgramDetailProps,
  ProgramProps,
} from './interface'
import { RegisterButton } from './module-elements/RegisterButton'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaWhatsapp } from 'react-icons/fa'

export const ProgramDetailModule: React.FC<ProgramDetailModuleProps> = ({
  id,
}) => {
  const router = useRouter()
  const [programDetail, setProgramDetail] = useState<ProgramDetailProps | null>(
    null
  )
  const [programs, setPrograms] = useState<ProgramProps[]>([])
  const [loading, setLoading] = useState(true)

  const getPrograms = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/program/branch/${programDetail?.branch}/programs`
      )
      const responseJson = await response.json()
      setPrograms(responseJson.contents || [])
    } catch (error) {
      toast.error('Gagal memuat program lainnya')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getProgramDetail = async () => {
      const at = getCookie('AT')
      try {
        const headers = at ? { Authorization: `Bearer ${at}` } : undefined
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/program/${id}`,
          {
            headers,
            cache: 'no-store',
          }
        )
        const responseJson = await response.json()

        if (
          responseJson.status === 401 ||
          responseJson.message === 'Token is invalid or expired'
        ) {
          deleteCookie('AT')
          router.push('/login')
          return
        }

        setProgramDetail(responseJson.contents)
      } catch (error) {
        toast.error('Terjadi kesalahan dalam mengambil data!')
      }
    }

    getProgramDetail()
  }, [id, router])

  useEffect(() => {
    if (programDetail) {
      getPrograms()
    }
  }, [programDetail])

  if (loading && !programDetail) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex">
      {programDetail ? (
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row w-full lg:h-[536px] bg-[#F8EAD9] justify-left items-center">
            <div className="w-full max-h-72 lg:max-h-none  lg:max-w-[40%] h-full relative">
              <Image
                src={programDetail.cover_image}
                alt={programDetail.title}
                width={1000}
                height={1000}
                className="object-cover lg:pr-16 w-full h-full"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-2 py-4 lg:gap-6 px-2 lg:pr-12">
              <h2 className="text-center lg:text-start lg:text-3xl font-bold text-[#A0653C]">
                {programDetail.title}
              </h2>
              <h1 className="text-center lg:text-start lg:text-4xl font-bold text-[#6C4534]">
                {programDetail.headline}
              </h1>
              <div className="flex flex-col lg:flex-row  lg:items-center gap-2">
                <RegisterButton
                  programId={programDetail.id}
                  userStatus={programDetail.user_status}
                />
                {programDetail.user_status === 'PENDING' && (
                  <a
                    href={
                      programDetail.cp_wa_number_1
                        ? `https://wa.me/${programDetail.cp_wa_number_1.replace(/^0/, '62').replace(/^\+/, '').replace(/[\s-]/g, '')}`
                        : '#'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="from-green-600 to-green-600 w-full font-semibold lg:text-lg mt-2 lg:py-6 lg:px-6 hover:from-green-700 hover:to-green-700 transition-all">
                      <FaWhatsapp size={36} />

                      <span className="flex items-center gap-2">
                        Lakukan Pembayaran
                      </span>
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row p-4 md:p-14 xl:p-28 gap-10 lg:gap-20 justify-center">
            <div className="flex flex-col lg:w-1/2 gap-8 lg:max-w-[606px]">
              <p className="text-justify">{programDetail.description}</p>
              <div className="flex flex-col gap-1">
                <h1 className="text-black font-bold text-2xl">Persyaratan</h1>
                {PERSYARATAN.map((syarat, index) => (
                  <p key={index}>
                    {index + 1}. {syarat}
                  </p>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-black font-bold text-2xl">
                  Masa Bimbingan
                </h1>
                {MASA_BIMBINGAN.map((waktu, index) => (
                  <li key={index}>{waktu}</li>
                ))}
              </div>
              <CustomButton title={programDetail.title} />
            </div>
            <div className="lg:w-1/2 flex flex-col items-center gap-6 ">
              <h1 className="text-[#5B3B1E] text-center text-xl sm:text-3xl leading-10 md:text-[2.5rem] font-bold">
                JENJANG MUSTAWA
              </h1>
              {JENJANG_MUSTAWA.map((jenjang, index) => (
                <div
                  className="flex flex-col items-center relative mt-3"
                  key={index}
                >
                  <h1 className="absolute px-6 bg-[#5B3B1E] text-white w-fit text-base font-semibold -top-3 line">
                    {jenjang.nama}
                  </h1>
                  <p className="py-3 px-8 border-2 border-[#5B3B1E] text-black text-base font-normal rounded-2xl text-justify">
                    {jenjang.keterangan}
                  </p>
                </div>
              ))}
              <div className="w-full bg-[#6C4534] rounded-lg text-white font-normal text-sm px-2 py-1">
                *Program ini khusus untuk yang sudah lulus Mustawa V
              </div>
            </div>
          </div>
          <div className="flex flex-col relative justify-center items-center gap-3">
            <h1 className="rounded-full bg-[#6C4534] text-white font-semibold text-3xl w-fit text-center px-7 py-4 z-10">
              Program Lainnya
            </h1>
            <hr className="absolute h-1 bg-[#6C4534] w-1/2 z-0 top-8" />
            <Carousel
              className="flex justify-center items-center relative mb-16 w-full max-w-screen-xl"
              opts={{ loop: true }}
            >
              <CarouselContent className="flex gap-2 py-10 px-7">
                {programs.map((program: ProgramProps) => (
                  <CarouselItem
                    key={program.id}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 w-[300px] h-[200px] flex justify-center items-center relative rounded-2xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)] border-4 border-white group"
                  >
                    <Link
                      href={`/program/${program.id}`}
                      className="w-full h-full"
                    >
                      <Image
                        src={program.cover_image}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <h3 className="text-white font-bold text-center px-4">
                          {program.title}
                        </h3>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}
