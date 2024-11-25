/* eslint-disable prettier/prettier */
export const JoinUsSection: React.FC = () => {
  return (
    <section className="py-[3.75rem] px-5 bg-[#F8EAD9] flex justify-center items-center flex-col gap-6">
      <div className="flex gap-4 flex-col">
        <h1 className="text-[#6C4534] text-[64px] leading-normal font-bold text-center">
          Bergabung Bersama Kami
        </h1>
        <p className="text-[28px] leading-normal font-medium text-[#6C4534] text-justify p-2">
          Dengan Metode Utsmani yang teruji mudah dan efektif sejak Tahun 1415 H
          / 1995 M
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <a
          href="./register"
          className="text-[#F8EAD9] bg-[#6C4534] rounded-full px-[3.25rem] py-3 text-[20px] leading-[40px] font-semibold border-2 border-[#6C4534] text-center hover:scale-105 transition-all cursor-pointer"
        >
          Daftar Sekarang
        </a>
        <p className="text-center text-[#6C4534] text-[24px] leading-normal font-medium">
          Atau
        </p>
        <a
          href="./login"
          className="text-[#6C4534] bg-[#F8EAD9] rounded-full px-[3.25rem] py-3 text-[20px] leading-[40px] font-semibold border-2 border-[#6C4534] text-center w-[272px] hover:scale-105 transition-all cursor-pointer"
        >
          Masuk
        </a>
      </div>
    </section>
  )
}
