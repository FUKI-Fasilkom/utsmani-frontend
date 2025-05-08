import React from 'react'

interface JenjangProps {
  levels: {
    name: string
    description: string
  }[]
}

export const JenjangSection: React.FC<JenjangProps> = ({ levels }) => {
  return (
    <div className="lg:w-1/2 flex flex-col items-center gap-6 ">
      <h1 className="text-[#5B3B1E] text-center text-xl sm:text-3xl leading-10 md:text-[2.5rem] font-bold">
        JENJANG MUSTAWA
      </h1>
      {levels.map((jenjang, index) => (
        <div className="flex flex-col items-center relative mt-3" key={index}>
          <h1 className="absolute px-6 bg-[#5B3B1E] text-white w-fit text-base font-semibold -top-3 line">
            {jenjang.name}
          </h1>
          <p className="py-3 px-8 border-2 border-[#5B3B1E] text-black text-base font-normal rounded-2xl text-justify">
            {jenjang.description}
          </p>
        </div>
      ))}
    </div>
  )
}
