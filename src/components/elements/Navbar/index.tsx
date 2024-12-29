'use client'

import { useAuthContext } from '@/components/context'
import { User } from '@/components/context/AuthContext/interface'
import { Button } from '@/components/ui/button'
import { deleteCookie } from 'cookies-next'
import { MenuIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const Navbar: React.FC = () => {
  const router = useRouter()
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuthContext()
  const [openNav, setOpenNav] = useState<boolean>(false)
  const openNavbar = () => {
    setOpenNav(!openNav)
  }
  const logout = () => {
    deleteCookie('AT')
    setIsAuthenticated(false)
    setUser({} as User)
    router.push('/login')
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
              <Link href="/">Beranda</Link>
            </li>
            <li>
              <Link href="/about">Tentang Kami</Link>
            </li>
            <li>
              <Link href="/program">Program</Link>
            </li>
            <li>
              <Link href="/news-quotes">Berita</Link>
            </li>
            <li>
              <Link href="/wakaf">Wakaf</Link>
            </li>
          </ul>
        </div>
        <div
          className={`block md:hidden absolute ${openNav ? 'top-14' : '-translate-y-full top-0'} transition-all left-0 z-50 w-full bg-[#FCF9F4]`}
        >
          <ul className="flex md:gap-3 flex-col lg:gap-8 font-medium ">
            <li>
              <Link href="/" className="w-full text-center block p-3 border-y">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="w-full text-center block p-3 border-y"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                href="/program"
                className="w-full text-center block p-3 border-y"
              >
                Program
              </Link>
            </li>
            <li>
              <Link
                href="/news-quotes"
                className="w-full text-center block p-3 border-y"
              >
                Berita
              </Link>
            </li>
            <li>
              <Link
                href="/wakaf"
                className="w-full text-center block p-3 border-y"
              >
                Wakaf
              </Link>
            </li>
          </ul>
        </div>
        <div className="gap-3 lg:gap-5 hidden md:flex">
          {isAuthenticated ? (
            <div className="relative group">
              {/* User Icon */}
              <div className="border-[2.5px] rounded-full border-[#6C4534] p-1 cursor-pointer">
                <UserIcon color="#6C4534" />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-20">
                <ul className="py-1 text-sm text-gray-700">
                  {/* Link ke Profile */}
                  <li>
                    <Link
                      href={'/profile'}
                      className="w-full block text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant={'tertiary'}>Masuk</Button>
              </Link>
              <Link href="/register">
                <Button>Daftar</Button>
              </Link>
            </>
          )}
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
