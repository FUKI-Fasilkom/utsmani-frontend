'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-[#FCF9F4] py-2">
      <div className="container flex items-center justify-between">
        <div className="relative w-40 aspect-[2]">
          <Image
            src={'/logo.png'}
            alt="Logo Al-Utsmani"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <ul className="flex gap-8 font-medium">
            <li>
              <a href="#">Beranda</a>
            </li>
            <li>
              <a href="#">Profil</a>
            </li>
            <li>
              <a href="#">Program</a>
            </li>
            <li>
              <a href="#">Wakaf</a>
            </li>
            <li>
              <a href="#">Kontak</a>
            </li>
          </ul>
        </div>
        <div className="flex gap-5">
          <Button variant={'tertiary'}>Masuk</Button>
          <Button>Daftar</Button>
        </div>
      </div>
    </nav>
  )
}
