import Image from 'next/image'

interface HeaderSectionProps {
  imageUrl: string
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ imageUrl }) => {
  return (
    <>
      <section className="relative w-full aspect-[21/9] text-center text-white">
        <Image
          src={imageUrl}
          alt="Header Profile"
          fill
          className="object-cover"
        />
      </section>
    </>
  )
}
