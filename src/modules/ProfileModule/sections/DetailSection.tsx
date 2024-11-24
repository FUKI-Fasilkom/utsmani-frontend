import { Email, Facebook, Instagram, Youtube } from '@/components/icons'

export const DetailSection: React.FC = () => {
  return (
    <section className="container flex gap-14 max-w-screen-lg">
      <div className="flex flex-col w-3/5 gap-8 text-[#F6EFE7] ">
        <div className="bg-[#6C4534] drop-shadow-lg shadow-black rounded-xl py-8 px-12 flex gap-2 flex-col items-center">
          <h2 className="font-bold text-4xl">Visi</h2>
          <p className="text-lg font-semibold text-center">
            Menghadirkan Pengalaman Belajar Mengajar Al-Quran yang Menyenangkan.
          </p>
        </div>
        <div className="bg-[#6C4534] drop-shadow-lg rounded-xl py-8 px-12 flex gap-2 flex-col items-center">
          <h2 className="font-bold text-4xl">Misi</h2>
          <ul className="list-disc flex flex-col gap-2 pl-4 font-medium">
            <li>Menghadirkan LBQ Al Utsmani di seluruh Provinsi.</li>
            <li>Membangun sistem manajemen yang akuntabel.</li>
            <li>Mencetak guru dan dai yang amanah.</li>
            <li>Membangun budaya ramah, disiplin, dan tuntas.</li>
            <li>
              Mengembangkan metode pembelajaran yang mudah, cepat, menyenangkan,
              dan adaptif.
            </li>
            <li>
              Membangun sarana dan prasarana pembelajaran yang aman dan nyaman.
            </li>
            <li>Membangun jaringan yang luas dan terpercaya.</li>
            <li>
              Mewujudkan kesejahteraan pada seluruh pegawai sehingga
              mengeluarkan seluruh potensi yang ada.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-2/5 gap-12">
        <div className="flex flex-col  gap-4">
          <h2 className="font-bold text-4xl text-center text-[#6C4534]">
            Legalitas
          </h2>
          <div className="bg-white drop-shadow-lg font-semibold rounded-xl py-5 px-8 flex gap-2 flex-col items-center">
            <div className="w-full ">
              <h3 className="text-[#6C4534]">Nama</h3>
              <span>Lembaga Bimbingan Al-Qur’an Al-Utsmani</span>
            </div>
            <div className="w-full ">
              <h3 className="text-[#6C4534]">Tahun Berdiri</h3>
              <span>1415 H. / 1995 M.</span>
            </div>
            <div className="w-full ">
              <h3 className="text-[#6C4534]">Alamat</h3>
              <span>
                Jl. Munggang No. 6 Condet Balekambang, Kramat Jati Jakarta Timur
                13530.
              </span>
            </div>
            <div className="w-full ">
              <h3 className="text-[#6C4534]">Email</h3>
              <span>utsmanipusat@gmail.com</span>
            </div>
            <div className="w-full ">
              <h3 className="text-[#6C4534]">Akte Notaris</h3>
              <span>No. 5-17 Juli 2006 Jhon Edy Rahman, SH.MKn</span>
            </div>
            <div className="w-full ">
              <h3 className="text-[#6C4534]">SK Kemenkumham RI</h3>
              <span>No. C-2087.HT.01.02. TH 2006</span>
            </div>
            <div className="w-full ">
              <h3 className="text-[#6C4534]">Izin Kemenag RI</h3>
              <span>KW.09.5/3/PP.007/8080/2011</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-4xl text-center text-[#6C4534]">
            Alamat Pusat
          </h2>
          <div className="rounded-xl aspect-video w-full overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.86476499567024!2d106.87827531248332!3d-6.2852459450540445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f29046438d6f%3A0xa01b5cb4c419a889!2sYayasan%20Al%20Utsmani%20Pinang%20Ranti!5e0!3m2!1sen!2sid!4v1732445279453!5m2!1sen!2sid"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <div className="bg-[#6C4534] p-1.5 rounded-sm aspect-square w-fit">
                <Facebook size="w-4" />
              </div>
              <span>
                <a href="#" className="underline text-[#6C4534] font-medium">
                  Facebook Al-Utsmani
                </a>
              </span>
            </div>
            <div className="flex gap-3">
              <div className="bg-[#6C4534] p-1.5 rounded-sm aspect-square w-fit">
                <Instagram size="w-4" />
              </div>
              <span>
                <a href="#" className="underline text-[#6C4534] font-medium">
                  Instagram Al-Utsmani
                </a>
              </span>
            </div>
            <div className="flex gap-3">
              <div className="bg-[#6C4534] p-1.5 rounded-sm aspect-square w-fit">
                <Youtube size="w-4" />
              </div>
              <span>
                <a href="#" className="underline text-[#6C4534] font-medium">
                  Youtube Al-Utsmani
                </a>
              </span>
            </div>
            <div className="flex gap-3">
              <div className="bg-[#6C4534] p-1.5 rounded-sm aspect-square w-fit">
                <Email size="w-4" />
              </div>
              <span>
                <a href="#" className="underline text-[#6C4534] font-medium">
                  Email Al-Utsmani
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
