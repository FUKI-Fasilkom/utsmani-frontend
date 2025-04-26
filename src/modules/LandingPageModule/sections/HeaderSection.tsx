import Image from 'next/image'

interface BannerData {
  imageUrl: string
  useDefaultLayout: boolean
}

const DefaultBanner = () => (
  <div className="flex items-center justify-center px-8 max-w-screen-xl h-[80%] mx-auto pt-16">
    <div className="flex items-center justify-center space-x-8 w-full max-w-[1000px]">
      <div className="text-center w-[45%]">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Lebih Bahagia</h2>
        <p className="text-3xl md:text-4xl">Bersama Al-Qur&apos;an</p>
      </div>
      <div className="w-[55%] flex items-center justify-center">
        <div className="relative w-full">
          <Image
            src="/fotobersama.png"
            alt="foto_bersama"
            className="w-full h-auto object-contain"
            height={1000}
            width={1000}
          />
        </div>
      </div>
    </div>
  </div>
)

const DynamicBanner = ({ imageUrl }: { imageUrl: string }) => (
  <Image
    src={imageUrl}
    alt="dynamic_banner"
    className="w-full h-auto object-contain"
    height={1000}
    width={1000}
  />
)

async function getBannerData(): Promise<BannerData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/homepage/banner`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch banner data: ${response.status}`)
    }
    const imageUrl = (await response.json()).imageUrl

    return {
      imageUrl,
      useDefaultLayout: !imageUrl,
    }
  } catch (error) {
    console.error('Error fetching banner data:', error)

    return {
      imageUrl: '',
      useDefaultLayout: true,
    }
  }
}

export const HeaderSection: React.FC = async () => {
  const bannerData = await getBannerData()
  return (
    <>
      <section className="relative bg-[#75482f] text-center text-white pb-3 w-full aspect-[21/9]">
        {bannerData.useDefaultLayout ? (
          <DefaultBanner />
        ) : (
          <DynamicBanner imageUrl={bannerData.imageUrl} />
        )}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-32"
          >
            <path
              d="M0,60
                 C150,20 150,100 300,60
                 C450,20 450,100 600,60
                 C750,20 750,100 900,60
                 C1050,20 1050,100 1200,60
                 L1200,120 L0,120 Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      <div className="lg:mx-auto lg:w-[914px] lg:h-[224px]  py-4 px-2 flex items-center justify-center text-center  text-[#6C4534] bg-white rounded-[20px] shadow-lg mt-8 font-poppins mx-3 md:mx-6">
        <p className="text-center font-bold text-[24px] lg:text-[32px]">
          Alhamdulillah atas izin Allah SWT. PTQ Al-Utsmani dengan metode
          Utsmani telah teruji Mudah dan Efektif sejak tahun 1415 H/1995 M
        </p>
      </div>
    </>
  )
}
