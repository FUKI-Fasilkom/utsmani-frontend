/* eslint-disable prettier/prettier */
import Image from 'next/image'
export const AboutSection: React.FC = () => {
  return (
    <section className="w-full md:py-[5.5rem] lg:px-28">
      <div className="flex flex-col lg:flex-row w-full h-full rounded-[20px] shadow-[2px_4px_6px_0px_rgba(0,0,0,0.25)] p-12 gap-[5.25rem] justify-between">
        <div className="lg:w-1/2 flex flex-col justify-start items-start gap-5">
          <h1 className=" text-5xl font-bold text-[#6C4534] leading-normal max-lg:mx-auto">
            Tentang Kami
          </h1>
          <p className="text-lg text-[#6C4534] font-semibold text-justify leading-normal">
            Lembaga Bimbingan Al-Qur’an Al-Utsmani memulai pembelajaran Al-Quran
            pada tahun 1415 H bertepatan dengan tahun 1995 M. Jumlah peserta
            didik terus bertambah setiap tahun dan sudah banyak alumni yang
            belajar tahsin, tajwid, dan tahfizh Al-Quran serta mengajar di
            berbagai lembaga di seluruh Indonesia.
          </p>
          <a
            href="./profile"
            className="my-2 lg:mt-8 rounded-full px-[3.25rem] py-3 bg-[#6C4534] text-[#F6EFE7] font-semibold text-lg cursor-pointer hover:scale-105 transition-all max-lg:self-center"
          >
            Selengkapnya
          </a>
        </div>
        <div className="lg:w-1/2 h-[346px] my-2 rounded-[40px] bg-[#6C4534] flex justify-center items-center max-md:order-first">
          <Image
            height={1385}
            width={1620}
            src="/ilustrasi-gedung-al-utsmani.png"
            alt=""
            className="h-full w-auto"
          ></Image>
        </div>
      </div>
    </section>
  )
}
