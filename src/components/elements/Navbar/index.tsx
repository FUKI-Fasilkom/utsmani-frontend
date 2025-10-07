'use client'

import { useAuthContext } from '@/components/context'
import { User } from '@/components/context/AuthContext/interface'
import { Button } from '@/components/ui/button'
import { deleteCookie } from 'cookies-next'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import UserProfileDropdown from './UserProfileDropdown'
import serverImageLoader from '@/lib/image/serverImageLoader'

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang Kami' },
  { href: '/program', label: 'Program' },
  { href: '/activity', label: 'Kegiatan' },
  { href: '/news-quotes', label: 'Berita' },
  { href: '/sedekah-jariyah', label: 'Sedekah Jariyah' },
]

// --- Main Navbar Component ---

export const Navbar: React.FC = () => {
  const router = useRouter()
  // Make sure your context provides the full user object
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useAuthContext()
  const [openNav, setOpenNav] = useState<boolean>(false)

  const navRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const toggleNavbar = () => setOpenNav(!openNav)
  const closeNavbar = () => setOpenNav(false)

  const logout = () => {
    deleteCookie('AT')
    setIsAuthenticated(false)
    setUser({} as User)
    closeNavbar()
    router.push('/login')
  }

  // Effect to handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuButtonRef.current?.contains(event.target as Node) ||
        !navRef.current ||
        navRef.current.contains(event.target as Node)
      ) {
        return
      }
      closeNavbar()
    }

    if (openNav) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openNav])

  return (
    <nav className="w-full bg-[#FCF9F4] h-[56px] md:h-[80px] py-2 px-4 fixed top-0 inset-x-0 z-30 drop-shadow-md">
      <div className="lg:container flex items-center justify-between h-full">
        {/* Logo */}
        <Link href={'/'} className="relative w-32 md:w-40 aspect-[2]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/site-settings/logo/`}
            alt="Logo Al-Utsmani"
            fill
            className="object-contain w-full h-full"
            loader={serverImageLoader}
            unoptimized
          />
        </Link>

        {/* Desktop Navigation & Auth */}
        <div className="hidden md:flex items-center gap-8 h-full">
          <ul className="flex h-full md:gap-2 lg:gap-6 font-medium">
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                className="flex justify-center items-center text-center hover:scale-105 transition-all duration-200"
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <UserProfileDropdown user={user} onLogout={logout} />
          ) : (
            <div className="flex gap-3 lg:gap-5">
              <Link href="/login">
                <Button variant={'tertiary'}>Masuk</Button>
              </Link>
              <Link href="/register">
                <Button>Daftar</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleNavbar} ref={menuButtonRef}>
            <MenuIcon />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          ref={navRef}
          className={`md:hidden absolute ${
            openNav ? 'top-14' : '-translate-y-[110%]'
          } transition-transform duration-300 left-0 z-50 w-full bg-[#FCF9F4] p-4 shadow-lg flex flex-col`}
        >
          <ul className="flex flex-col gap-2 font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="w-full text-center block p-3 border-b"
                  onClick={closeNavbar}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-8">
            {isAuthenticated ? (
              <>
                <Link href="/profile" onClick={closeNavbar}>
                  <Button variant="secondary" className="w-full">
                    Lihat Profil
                  </Button>
                </Link>
                <Button onClick={logout} variant="danger" className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={closeNavbar}>
                  <Button variant={'tertiary'} className="w-full">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" onClick={closeNavbar}>
                  <Button className="w-full">Daftar</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
