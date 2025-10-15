'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, Award, ClipboardList, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { ProfileTab } from '../interface'

interface ProfileSidebarProps {
  activeTab: ProfileTab
}

const tabToPathMap: Record<ProfileTab, string> = {
  [ProfileTab.Profile]: '/profile/my-profile',
  [ProfileTab.Registrations]: '/profile/my-programs',
  [ProfileTab.Certificates]: '/profile/my-certificates',
}

const navItems = [
  { id: ProfileTab.Profile, label: 'Profil Saya', icon: User },
  {
    id: ProfileTab.Registrations,
    label: 'Riwayat Pendaftaran',
    icon: ClipboardList,
  },
  { id: ProfileTab.Certificates, label: 'Sertifikat & Rapor', icon: Award },
] as const

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
}) => {
  const router = useRouter()
  const handleLogout = () => {
    deleteCookie('AT')
    deleteCookie('RT')
    router.push('/login')
  }

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="p-4 border rounded-lg shadow-sm bg-white space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              'w-full justify-start text-base p-6',
              activeTab === item.id && 'bg-gray-100 text-brown font-semibold'
            )}
            asChild
          >
            <Link href={tabToPathMap[item.id]}>
              <item.icon className="mr-3 h-6 w-6" />
              {item.label}
            </Link>
          </Button>
        ))}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-base p-6 text-red-500 hover:text-red-600"
        >
          <LogOut className="mr-3 h-6 w-6" />
          Keluar
        </Button>
      </div>
    </aside>
  )
}
