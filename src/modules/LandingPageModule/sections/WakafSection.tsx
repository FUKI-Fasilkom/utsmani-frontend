import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export const WakafSection: React.FC = () => {
  return (
    <section className="container flex gap-10 justify-center items-start md:items-center py-8 lg:py-12">
      <div className="rounded-3xl md:w-[569px] h-[581px] max-md:hidden">
        <Image
          src="/assets/images/berwakaf.jpeg"
          alt="Berwakaf"
          width={569}
          height={581}
          className="rounded-3xl w-[569px] h-[581px] max-md:hidden object-cover"
        />
      </div>
      <div className="flex flex-col gap-9 justify-center items-center md:w-[589px]">
        <div className="text-center text-brown">
          <h4 className="font-semibold heading-4">
            Jaga harta titipan Allah dengan
          </h4>
          <h2 className="font-bold title-lg">BERSEDEKAH</h2>
        </div>
        <div className="py-8 px-4 md:px-6 xl:px-16  text-start rounded-3xl drop-shadow-sm shadow-lg ring-[1px] ring-gray-100 flex flex-col items-center gap-8">
          <p className="text-center paragraph-lg italic font-medium  xl:text-xl text-brown inset-y-2">
            <q>
              Jika seseorang meninggal dunia, maka terputuslah amalannya kecuali
              tiga perkara (yaitu); sedekah jariyah, ilmu yang bermanfaat, dan
              doa anak yang sholihah
            </q>
            <br className="" />
            <span className="mt-2 block">(HR. Muslim)</span>
          </p>
          <Link href={'/sedekah-jariyah'}>
            <Button variant={'secondary'} size={'lg'} className="subtitle">
              Mari Bersedekah
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
