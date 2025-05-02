import React from 'react'
import Image from 'next/image'

type Props = {
  imageUrl: string
}

export const StructureSection: React.FC<Props> = ({ imageUrl }) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold heading-2 text-center text-[#6C4534]">
        Struktur Organisasi
      </h2>
      <Image
        src={imageUrl}
        width={2480}
        height={3508}
        alt="Struktur Organisasi"
      />
    </section>
  )
}
