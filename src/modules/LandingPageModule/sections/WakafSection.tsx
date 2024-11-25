import Image from 'next/image'

export const WakafSection: React.FC = () => {
  return (
    <section className="container flex gap-10 justify-center items-center">
      <div className="rounded-3xl w-[569px] h-[581px]">
        <Image
          src="https://picsum.photos/100/100"
          alt="foto wakaf"
          width={569}
          height={581}
          className="rounded-3xl w-[569px] h-[581px]"
        />
      </div>
      <div className="flex flex-col gap-9 justify-center items-center w-[589px]">
        <div className="text-center text-brown">
          <h4 className="font-semibold text-3xl">
            Jaga harta titipan Allah dengan
          </h4>
          <h2 className="font-bold text-7xl">BERWAKAF</h2>
        </div>
        <div className="py-8 px-16 text-start rounded-3xl drop-shadow-sm shadow-lg ring-[1px] ring-gray-100">
          <p className="leading-8 italic font-semibold text-xl text-brown">
            <q>
              Jika seseorang meninggal dunia, maka terputuslah amalannya kecuali
              tiga perkara (yaitu); sedekah jariyah, ilmu yang bermanfaat, dan
              doa anak yang sholihah
            </q>
            <br />
            (HR. Muslim)
          </p>
        </div>
      </div>
    </section>
  )
}
