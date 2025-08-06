import Link from 'next/link'
import TikTokIcon from '@/components/icons/TikTok'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Facebook, Instagram, Youtube } from '@/components/icons'
import { BranchSectionProps } from '../interface'

export const BranchSection: React.FC<BranchSectionProps> = ({ branches }) => {
  return (
    <section className="max-w-screen-xl mx-auto container pb-20 flex flex-col gap-y-16 md:flex-row md:gap-x-9">
      <BranchListSection branches={branches} />
      <OurContactSection />
    </section>
  )
}

const BranchListSection: React.FC<BranchSectionProps> = ({ branches }) => {
  return (
    <section className="w-full md:w-[60%] flex flex-col bg-white drop-shadow-lg rounded-[20px] text-[#6C4534] px-[32px] py-[40px]">
      <h2 className="font-bold text-4xl heading-2 text-center">
        Cabang Al-Utsmani
      </h2>
      <ol className="paragraph font-medium mt-8">
        {branches.map((branch, index) => (
          <li key={index}>
            <Link
              href={`/branch/${branch.id}`}
              className="flex items-center gap-x-2 group"
            >
              <span className="inline-block w-6 text-right">{index + 1}. </span>
              <span className="group-hover:underline">{branch.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}

const OurContactSection: React.FC = () => {
  const socialMediaList = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/alutsmani/',
      icon: Instagram,
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@alutsmani.official?_t=8gdf7vgtphg&_r=1',
      icon: TikTokIcon,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/LBQUTSMANI',
      icon: Facebook,
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/@al-utsmaniofficial',
      icon: Youtube,
    },
  ]
  return (
    <section className="w-full md:w-[40%] bg-[#6C4534] drop-shadow-lg rounded-[20px] text-[#F6EFE7] py-10 px-8">
      <h2 className="font-bold heading-2 mb-[24px] text-center">Kontak Kami</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9231945830525!2d106.8555097!3d-6.273829600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f25c5ebc92e7%3A0x26e0773a660cb6c5!2sLembaga%20Bimbingan%20Al-Quran%20Al-Utsmani!5e0!3m2!1sen!2sid!4v1730805535208!5m2!1sen!2sid"
        height="200"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full rounded-[20px] mb-[24px]"
      ></iframe>
      <div className="flex justify-center gap-2 items-center">
        {socialMediaList.map((socialMedia) => (
          <Link key={socialMedia.name} href={socialMedia.url}>
            <socialMedia.icon className="w-[54px]" />
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-y-4 mt-4">
        <div className="flex gap-x-4">
          <MapPin size={36} />
          <Link href="https://maps.app.goo.gl/J6gSfVfPHwqYnmgT7">
            Jl. Munggang No. 6 Balekambang, Kramat Jati, Jakarta Timur.
          </Link>
        </div>
        <div className="flex gap-x-4">
          <Mail size={24} />
          <Link href="mailto:utsmanipusat@gmail.com" className="underline">
            utsmanipusat@gmail.com
          </Link>
        </div>
        <div className="flex gap-x-4">
          <Phone size={24} />
          <div className="underline">
            <Link href="tel:+62218011061">(021) 8011061</Link>,{' '}
            <Link href="tel:+62218094741">8094741</Link>,{' '}
            <Link href="tel:+622180874069">80874069</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
