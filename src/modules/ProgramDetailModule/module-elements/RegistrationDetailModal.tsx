'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { FaWhatsapp } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'
import type { Branch, UserStatus } from '../interface'

interface RegistrationDetailModalProps {
  isOpen: boolean
  onClose: () => void
  branch: Branch | null
  user_status: UserStatus
  cp_wa_number_1?: string
}

export const RegistrationDetailModal: React.FC<
  RegistrationDetailModalProps
> = ({ isOpen, onClose, branch, user_status, cp_wa_number_1 }) => {
  if (!isOpen || !branch) return null

  const getStatusBadge = () => {
    switch (user_status) {
      case 'PENDING':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-500">
            Menunggu Pembayaran
          </Badge>
        )
      case 'ACCEPTED':
        return (
          <Badge className="bg-green-500 hover:bg-green-500">Diterima</Badge>
        )
      case 'DECLINED':
        return <Badge className="bg-red-500 hover:bg-red-500">Ditolak</Badge>
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-brown">Detail Pendaftaran</h2>
            {getStatusBadge()}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium text-brown">Cabang</h3>
            <div className="flex items-center justify-between mt-2">
              <p className="text-gray-700">{branch.branch.title}</p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`/branch/${branch.branch.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  Detail <ExternalLink size={14} />
                </a>
              </Button>
            </div>
          </div>

          {user_status === 'PENDING' && (
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-4">
                Silakan lakukan pembayaran untuk menyelesaikan pendaftaran Anda.
              </p>
              <a
                href={
                  cp_wa_number_1
                    ? `https://wa.me/${cp_wa_number_1
                        .replace(/^0/, '62')
                        .replace(/^\+/, '')
                        .replace(/[\s-]/g, '')}`
                    : '#'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 justify-center py-6">
                  <FaWhatsapp size={24} />
                  <span>Lakukan Pembayaran</span>
                </Button>
              </a>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-lg flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  )
}
