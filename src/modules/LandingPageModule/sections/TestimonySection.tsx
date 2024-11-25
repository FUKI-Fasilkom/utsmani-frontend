import { TESTIMONY_EXAMPLES } from '../constant'
import Image from 'next/image'

export const TestimonySection: React.FC = () => {
  const testimonyCards = TESTIMONY_EXAMPLES
  return (
    <section className="container flex flex-col gap-6 items-center text-brown">
      <div>
        <h2 className="font-bold text-5xl text-center">
          Apa kata mereka tetang Al-Utsmani?
        </h2>
      </div>
      <div className="flex gap-5 justify-center">
        {testimonyCards.map((testimony, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="py-8 px-10 shadow-lg drop-shadow-sm rounded-2xl">
              <p className="italic font-semibold leading-6">
                {testimony.quote}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src={testimony.profilePicture}
                height={64}
                width={64}
                alt="pp testimony"
                className="rounded-full h-16 w-16"
              />
              <div>
                <h4 className="font-bold text-xl">{testimony.nama}</h4>
                <p className="font-medium text-lg">{testimony.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
