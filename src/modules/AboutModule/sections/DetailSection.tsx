import { Email, Facebook, Instagram, Youtube } from '@/components/icons'
import { AboutPageData } from '../interface'

interface DetailSectionProps {
  data: AboutPageData
}

export const DetailSection: React.FC<DetailSectionProps> = ({ data }) => {
  const { vision, missions, legalities, socialLinks, mapEmbedUrl } = data

  return (
    <section className="container flex flex-col lg:flex-row gap-14 max-w-screen-lg">
      <div className="flex flex-col w-full lg:w-3/5 gap-8 text-[#F6EFE7] ">
        <div className="bg-[#6C4534] drop-shadow-lg shadow-black rounded-xl py-8 px-12 flex gap-2 flex-col items-center">
          <h2 className="font-bold text-4xl">Visi</h2>
          <p className="text-lg font-semibold text-center">{vision}</p>
        </div>
        <div className="bg-[#6C4534] drop-shadow-lg rounded-xl py-8 px-12 flex gap-2 flex-col items-center">
          <h2 className="font-bold text-4xl">Misi</h2>
          <ul className="list-disc flex flex-col gap-2 pl-4 font-medium">
            {missions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-2/5 gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-4xl text-center text-[#6C4534]">
            Legalitas
          </h2>
          <div className="bg-white drop-shadow-lg font-semibold rounded-xl py-5 px-8 flex gap-2 flex-col items-center">
            {legalities.map((item, index) => (
              <div className="w-full" key={index}>
                <h3 className="text-[#6C4534]">{item.label}</h3>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-4xl text-center text-[#6C4534]">
            Alamat Pusat
          </h2>
          <div className="rounded-xl aspect-video w-full overflow-hidden">
            <iframe
              src={mapEmbedUrl}
              className="w-full h-full"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex flex-col gap-2">
            {socialLinks.map(({ platform, label, url }) => (
              <div className="flex gap-3" key={platform}>
                <div className="bg-[#6C4534] p-1.5 rounded-sm aspect-square w-fit">
                  {platform === 'facebook' && <Facebook size="w-4" />}
                  {platform === 'instagram' && <Instagram size="w-4" />}
                  {platform === 'youtube' && <Youtube size="w-4" />}
                  {platform === 'email' && <Email size="w-4" />}
                </div>
                <span>
                  <a
                    href={url}
                    className="underline text-[#6C4534] font-medium"
                  >
                    {label}
                  </a>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
