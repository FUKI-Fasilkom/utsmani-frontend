import Image from 'next/image'
import { BannerCarousel } from '../module-elements'

interface Banner {
  name: string
  imageUrl: string
  link: string | null
}

const DefaultBanner = () => (
  <div className="flex items-center justify-center px-8 max-w-screen-xl h-[80%] mx-auto pt-16">
    <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-8 w-full max-w-[1000px]">
      <div className="text-center w-full md:w-[45%]">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Lebih Bahagia</h2>
        <p className="text-3xl md:text-4xl">Bersama Al-Qur&apos;an</p>
      </div>
      <div className="w-full md:w-[55%] flex items-center justify-center">
        <div className="relative w-full">
          <Image
            src="/fotobersama.png"
            alt="foto_bersama"
            className="w-full h-auto object-contain"
            height={1000}
            width={1000}
            priority
          />
        </div>
      </div>
    </div>
  </div>
)

async function getBannerData(): Promise<Banner[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/homepage/banner`,
      { cache: 'no-store' }
    )

    if (!response.ok) {
      console.error(`Failed to fetch banner data: ${response.status}`)
      return []
    }

    const data: Banner[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching banner data:', error)
    return []
  }
}

export const HeaderSection = async () => {
  const banners = await getBannerData()
  const hasBanners = banners && banners.length > 0

  return (
    <>
      <section className="relative bg-[#75482f] text-center text-white w-full aspect-[21/9]">
        {hasBanners ? <BannerCarousel banners={banners} /> : <DefaultBanner />}
      </section>

      <div className="lg:mx-auto lg:w-[914px] lg:h-[224px] p-4 flex items-center justify-center text-center text-[#6C4534] bg-white rounded-[20px] shadow-lg mt-8 font-poppins mx-3 md:mx-6">
        <p className="text-center font-semibold text-[18px] md:text-[24px] lg:text-[32px]">
          Alhamdulillah atas izin Allah SWT. PTQ Al-Utsmani dengan metode
          Utsmani telah teruji Mudah dan Efektif sejak tahun 1415 H/1995 M
        </p>
      </div>
    </>
  )
}
