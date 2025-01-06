import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { WrapperCard } from '../module-elements'

interface ContactPersonSectionProps {
  name: string
  detail: string
  wa_number: string | null
  email: string | null
}

export const ContactPersonSection: React.FC<ContactPersonSectionProps> = ({
  name,
  detail,
  wa_number,
  email,
}) => {
  return (
    <WrapperCard className="text-brown">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">Narahubung</h2>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-col">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-brown">{name}</p>
          <p className="md:text-lg lg:text-xl">{detail}</p>
        </div>
        <div className="flex flex-col gap-2 md:text-lg lg:text-xl">
          {wa_number && (
            <Link
              href={`https://wa.me/${wa_number}`}
              className="flex gap-2 group"
            >
              <FaWhatsapp className="h-6 w-6" />{' '}
              <span className="group-hover:underline">{wa_number}</span>
            </Link>
          )}
          {email && (
            <Link href={`mailto:${email}`} className="flex gap-2 group">
              <Mail className="h-6 w-6" />{' '}
              <span className="group-hover:underline">{email}</span>
            </Link>
          )}
        </div>
      </div>
    </WrapperCard>
  )
}
