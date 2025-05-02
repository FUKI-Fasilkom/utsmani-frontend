import Image from 'next/image'

interface HeaderSectionProps {
  imageUrl: string
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ imageUrl }) => {
  return (
    <>
      <section className="relative  h-[600px] text-center text-white">
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
