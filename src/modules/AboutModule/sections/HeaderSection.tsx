import Image from 'next/image'

export const HeaderSection: React.FC = () => {
  return (
    <>
      <section className="relative  h-[600px] text-center text-white">
        <Image
          src="/header-profile.png"
          alt="Header Profile"
          fill
          className="object-cover"
        />
      </section>
    </>
  )
}
