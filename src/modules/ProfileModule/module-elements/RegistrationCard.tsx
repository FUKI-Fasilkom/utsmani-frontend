'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { UserRegistration } from '../interface'
import { ContactPersonModal } from './ContactPersonModal'

interface RegistrationCardProps {
  registration: UserRegistration
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getStatusBadgeVariant = (status: UserRegistration['status']) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-500 hover:bg-yellow-500/80'
    case 'ACCEPTED':
      return 'bg-green-500 hover:bg-green-500/80'
    case 'DECLINED':
      return 'bg-red-500 hover:bg-red-500/80'
    default:
      return 'bg-gray-500'
  }
}

const getStatusText = (status: UserRegistration['status']) => {
  switch (status) {
    case 'PENDING':
      return 'Menunggu Konfirmasi'
    case 'ACCEPTED':
      return 'Diterima'
    case 'DECLINED':
      return 'Ditolak'
    default:
      return 'Tidak Diketahui'
  }
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  registration,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { status, branch_program, batch_program, created_at, updated_at } =
    registration

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg shadow-sm bg-white">
        <div className="relative w-full md:w-48 h-32 md:h-auto flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={
              branch_program.program.cover_image ||
              '/assets/images/image-placeholder.jpg'
            }
            alt={branch_program.program.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-[#6C4534] hover:text-[#8B5A3C]">
              <Link href={`/program/${branch_program.program.id}`}>
                {branch_program.program.title}
              </Link>
            </h3>
            <Badge
              className={cn(
                'text-white text-center',
                getStatusBadgeVariant(status)
              )}
            >
              {getStatusText(status)}
            </Badge>
          </div>
          <p className="text-sm font-semibold text-gray-700 mt-1 hover:underline">
            <Link href={`/branch/${branch_program.branch.id}`}>
              {branch_program.branch.name}
            </Link>
          </p>
          <p className="text-sm text-gray-500">{batch_program.title}</p>

          <div className="text-xs text-gray-400 mt-2 space-y-1">
            <p>Didaftarkan pada: {formatDate(created_at)}</p>
            <p>Diperbarui pada: {formatDate(updated_at)}</p>
          </div>

          {status === 'PENDING' && (
            <div className="mt-auto pt-4 flex justify-end">
              <Button variant="tertiary" onClick={() => setIsModalOpen(true)}>
                Hubungi Admin
              </Button>
            </div>
          )}
        </div>
      </div>
      {branch_program.contact_persons && (
        <ContactPersonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contactPersons={branch_program.contact_persons}
        />
      )}
    </>
  )
}
