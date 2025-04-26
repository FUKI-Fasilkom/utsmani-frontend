import { ProgramProps, ProgramSectionProps } from '../interface'
import Image from 'next/image'
import Link from 'next/link'

export const ProgramSection: React.FC<ProgramSectionProps> = ({
  branchPrograms,
}) => {
  const programs = branchPrograms.flatMap((branch) => branch.programs)
  return (
    <section className="container items-center flex flex-col px-4 gap-8">
      <div className="mb-8">
        <h2 className="text-center text-brown font-bold text-3xl md:text-5xl leading-[48px] md:leading-[72px]">
          Program Unggulan <br /> Pesantren Tahfizh Al-Quran Al Utsmani
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-5">
        {programs.map((program: ProgramProps, index) => (
          <Link
            href={`/program/${program.id}`}
            key={index}
            className="w-[240px] h-[240px] border-2 border-brown rounded-[40px] overflow-hidden flex items-center justify-center relative"
          >
            <Image
              src={program.cover_image}
              alt={program.title}
              className="object-cover w-full h-full"
              width={288}
              height={272}
            />
            <div className="py-4 px-2 absolute bottom-0 w-full flex justify-center">
              <span className=" font-bold text-2xl text-center text-white1">
                {program.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
