'use client'

import React from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

interface RegistrationSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export const RegistrationSuccessModal: React.FC<
  RegistrationSuccessModalProps
> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <DialogTitle className="text-2xl font-bold">
              Pendaftaran Berhasil!
            </DialogTitle>
            <DialogDescription className="mt-2 px-4">
              Pendaftaran Anda telah kami terima. Untuk melanjutkan proses,
              silakan hubungi admin program/cabang untuk konfirmasi dan
              informasi pembayaran.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row sm:justify-center gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button asChild>
            <Link href="/profile/my-programs">Lihat Riwayat Pendaftaran</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
