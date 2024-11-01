/* eslint-disable prettier/prettier */
export const AboutSection: React.FC = () => {
  return (
  <section className="w-full py-[5.5rem] px-28">
    <div className="flex w-full h-full rounded-[20px] shadow-[2px_4px_6px_0px_rgba(0,0,0,0.25)] p-12 gap-[5.25rem] justify-between">
      <div className="w-[50%] flex flex-col justify-start items-start gap-5">
        <h1 className="text-5xl font-semibold text-[#6C4534] leading-normal">Tentang Kami</h1>
        <p className="text-lg text-[#6C4534] font-semibold text-justify leading-normal">Lembaga Bimbingan Al-Qur’an Al-Utsmani memulai pembelajaran Al-Quran pada tahun 1415 H bertepatan dengan tahun 1995 M. Jumlah peserta didik terus bertambah setiap tahun dan sudah banyak alumni yang belajar tahsin, tajwid, dan tahfizh Al-Quran serta mengajar di berbagai lembaga di seluruh Indonesia.</p>
        <div className="mt-8 rounded-full px-[3.25rem] py-3 bg-[#6C4534] text-[#F6EFE7] font-semibold text-lg cursor-pointer">Selengkapnya</div>
      </div>
      <div className="w-[50%] h-[346px] my-2 rounded-[40px] bg-[#6C4534]">
        {/* isi dengan asset */}
      </div>
    </div>
  </section>)
}
