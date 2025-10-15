'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { ContactPerson } from '../interface'

interface ContactPersonModalProps {
  isOpen: boolean
  onClose: () => void
  contactPersons: ContactPerson[]
}

export const ContactPersonModal: React.FC<ContactPersonModalProps> = ({
  isOpen,
  onClose,
  contactPersons,
}) => {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hubungi Admin</DialogTitle>
          <DialogDescription>
            Silakan hubungi salah satu admin di bawah ini untuk informasi lebih
            lanjut mengenai pendaftaran Anda.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          {contactPersons.length > 0 ? (
            contactPersons.map((cp) => (
              <div
                key={cp.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <p className="font-semibold">{cp.name}</p>
                  <p className="text-sm text-gray-600">{cp.phone}</p>
                </div>
                <Button asChild>
                  <a
                    href={`https://wa.me/${cp.phone.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat via WhatsApp
                  </a>
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              Tidak ada contact person yang tersedia.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
