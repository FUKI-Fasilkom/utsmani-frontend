import Image from 'next/image'

export const HeaderSection: React.FC = () => {
  return (
    <>
      <section
        id="header"
        className="relative bg-[#75482f] text-center text-white pb-3"
      >
        <div className="flex items-center justify-center px-8 max-w-[1269px] h-[350px] mx-auto pt-16">
          <div className="flex items-center justify-center gap-8 w-full max-w-[1000px]">
            <div className="text-center w-[45%]">
              <h2 className="text-5xl font-bold mb-4">Lebih Bahagia</h2>
              <p className="text-3xl">Bersama Al-Qur&apos;an</p>
            </div>
            <div className="w-[45%] flex items-center justify-center">
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
