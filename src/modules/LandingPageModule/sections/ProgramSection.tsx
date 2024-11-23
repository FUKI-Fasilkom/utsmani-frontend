import { PROGRAM_EXAMPLES } from '../constant'
import { ProgramProps } from '../interface'
import Image from 'next/image'
import Link from 'next/link'

export const ProgramSection: React.FC = () => {
  const programs = PROGRAM_EXAMPLES

  return (
    <section className="container items-center flex flex-col px-4 gap-8">
      <div className="mb-8">
        <h2 className="text-center text-brown font-bold text-5xl leading-[72px]">
          Program Unggulan Pesantren Tahfizh Al-Quran Al Utsmani
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-5">
        {programs.map((program: ProgramProps, index) => (
          <Link
            href={program.url}
            key={index}
            className="w-[288px] h-[272px] border-2 border-brown rounded-[40px] overflow-hidden flex items-center justify-center relative"
          >
            <Image
              src={program.image_link}
              alt={program.name}
              className="object-cover w-full h-full"
              width={288}
              height={272}
            />
            <span className="absolute bottom-4 font-bold text-2xl text-center text-white1">
              {program.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
