'use server'
import Image from 'next/image'
import { PERSYARATAN, MASA_BIMBINGAN, JENJANG_MUSTAWA } from './constant'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextProgram,
  CarouselPreviousProgram,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { CustomButton } from './module-elements/CustomButton'
import {
  ProgramDetailModuleProps,
  ProgramDetailProps,
  ProgramProps,
} from './interface'
import { RegisterButton } from './module-elements/RegisterButton'
import { toast } from 'sonner'

async function getProgramDetail(id: string) {
  const programId = id
  const at = getCookie('AT', { cookies })
  try {
    const headers = at ? { Authorization: `Bearer ${at}` } : undefined
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/${programId}`,
      {
        headers,
        cache: 'no-store',
      }
    )
    const responseJson = await response.json()
    const programDetail = (await responseJson.contents) as ProgramDetailProps

    return programDetail
  } catch (error) {
    toast.error('Terjadi kesalahan dalam mengambil data!')
  }
}
async function getPrograms() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/program`)
  const responseJson = await response.json()
  const programs = await responseJson.contents
  return programs
}

export const ProgramDetailModule: React.FC<ProgramDetailModuleProps> = async ({
  id,
}) => {
  const programDetail = await getProgramDetail(id)
  const programs = await getPrograms()
  return (
    <main className="flex">
      {programDetail ? (
        <div className="flex flex-col">
          <div className="flex w-full h-[536px] bg-[#F8EAD9] justify-left items-center">
            <div className="w-full max-w-screen-sm h-full relative">
              <Image
                src={programDetail.cover_image}
                alt={programDetail.title}
                width={1000}
                height={1000}
                className="object-cover pr-16 w-full h-full"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-6 pr-12">
              <h2 className="text-3xl font-bold text-[#A0653C]">
                {programDetail.title}
              </h2>
              <h1 className="text-4xl font-bold text-[#6C4534]">
                {programDetail.headline}
              </h1>

              <RegisterButton
                programId={programDetail.id}
                userStatus={programDetail.user_status}
              />
            </div>
          </div>
          <div className="flex p-28 gap-[4.5rem]">
            <div className="flex flex-col w-1/2 gap-8 max-w-[606px]">
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
            <div className="w-1/2 flex flex-col items-center gap-6 px-[4.2rem]">
              <h1 className="text-[#5B3B1E] text-[2.5rem] font-bold">
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
              className="flex justify-center items-center relative mb-16"
              opts={{ loop: true }}
            >
              <CarouselContent className="flex gap-2 py-10 px-7">
                {programs.map((program: ProgramProps) => (
                  <CarouselItem
                    key={program.id}
                    className="basis-1/4 w-[300px] h-[200px] flex justify-center items-center relative rounded-2xl overflow-hidden shadow-[4px_4px_8px_4px_rgba(0,0,0,0.15)] border-4 border-white"
                  >
                    <Link href={`/program/${program.id}`}>
                      <Image
                        src={program.cover_image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPreviousProgram
                variant={'secondary'}
                className="h-12 w-12"
              />
              <CarouselNextProgram
                variant={'secondary'}
                className="h-12 w-12"
              />
            </Carousel>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}
