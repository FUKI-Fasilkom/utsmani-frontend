import Link from 'next/link'

/* eslint-disable prettier/prettier */
export const JoinUsSection: React.FC = () => {
  return (
    <section className="py-[3.75rem] px-5 bg-[#F8EAD9] flex justify-center items-center flex-col gap-6">
      <div className="flex gap-4 flex-col">
        <h1 className="text-[#6C4534] title text-center">
          Bergabung Bersama Kami
        </h1>
        <p className="subtitle leading-normal font-medium text-[#6C4534]  p-2 text-center">
          Dengan Metode Utsmani yang teruji mudah dan efektif sejak Tahun 1415 H
          / 1995 M
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <Link
          href="/register"
          className="text-[#F8EAD9] bg-[#6C4534] rounded-full px-[3.25rem] py-3 paragraph-lg leading-[40px] font-semibold border-2 border-[#6C4534] text-center hover:scale-105 transition-all cursor-pointer"
        >
          Daftar Sekarang
        </Link>
        <p className="text-center text-[#6C4534] paragraph leading-normal font-medium">
          Atau
        </p>
        <Link
          href="/login"
          className="text-[#6C4534] bg-[#F8EAD9] rounded-full px-[3.25rem] py-3 paragraph-lg leading-[40px] font-semibold border-2 border-[#6C4534] text-center w-[272px] hover:scale-105 transition-all cursor-pointer"
        >
          Masuk
        </Link>
      </div>
    </section>
  )
}
