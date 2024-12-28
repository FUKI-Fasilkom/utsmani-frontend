'use client'

import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const Navbar: React.FC = () => {
  const [openNav, setOpenNav] = useState<boolean>(false)
  const openNavbar = () => {
    setOpenNav(!openNav)
  }
  return (
    <nav className="w-full bg-[#FCF9F4] py-2">
      <div className="container flex items-center justify-between">
        <div className="relative w-20 md:w-40 aspect-[2]">
          <Image
            src={'/logo.png'}
            alt="Logo Al-Utsmani"
            fill
            className="object-contain"
          />
        </div>
        <div className="hidden md:block">
          <ul className="flex md:gap-3 lg:gap-8 font-medium">
            <li>
              <a href="/">Beranda</a>
            </li>
            <li>
              <a href="/profile">Profil</a>
            </li>
            <li>
              <a href="/program">Program</a>
            </li>
            <li>
              <a href="/news-quotes">Berita</a>
            </li>
            <li>
              <a href="/wakaf">Wakaf</a>
            </li>
            <li>
              <a href="/kontak">Kontak</a>
            </li>
          </ul>
        </div>
        <div
          className={`block md:hidden absolute ${openNav ? 'top-14' : '-translate-y-full top-0'} transition-all left-0 z-50 w-full bg-[#FCF9F4]`}
        >
          <ul className="flex md:gap-3 flex-col lg:gap-8 font-medium ">
            <li>
              <a href="/" className="w-full text-center block p-3 border-y">
                Beranda
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="w-full text-center block p-3 border-y"
              >
                Profil
              </a>
            </li>
            <li>
              <a
                href="/program"
                className="w-full text-center block p-3 border-y"
              >
                Program
              </a>
            </li>
            <li>
              <a
                href="/news-quotes"
                className="w-full text-center block p-3 border-y"
              >
                Berita
              </a>
            </li>
            <li>
              <a
                href="/wakaf"
                className="w-full text-center block p-3 border-y"
              >
                Wakaf
              </a>
            </li>
            <li>
              <a
                href="/kontak"
                className="w-full text-center block p-3 border-y"
              >
                Kontak
              </a>
            </li>
          </ul>
        </div>
        <div className="gap-3 lg:gap-5 hidden md:flex">
          <Link href="/login">
            <Button variant={'tertiary'}>Masuk</Button>
          </Link>
          <Link href="/register">
            <Button>Daftar</Button>
          </Link>
        </div>
        <div className="block md:hidden">
          <button onClick={openNavbar}>
            <MenuIcon />
          </button>
        </div>
      </div>
    </nav>
  )
}
