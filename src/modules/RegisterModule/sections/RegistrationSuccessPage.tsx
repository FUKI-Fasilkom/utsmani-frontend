import React from 'react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CircleCheckBig } from 'lucide-react'

export const RegistrationSuccessPage: React.FC = () => {
  return (
    <div className="w-full h-screen relative bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full flex flex-col items-center ">
        <h1 className="text-2xl font-semibold text-center text-[#6C4534] mb-8">
          Akun Terverifikasi!
        </h1>
        <CircleCheckBig size={80} color="#6C4534" className="mb-8" />
        <p className="text-sm text-center text-gray-600 mb-10">
          OTP yang Anda masukkan sudah terverifikasi sehingga akun Anda berhasil
          dibuat.
        </p>

        <Link href="/login" className="block w-full">
          <Button variant={'tertiary'} className="w-full">
            Login
          </Button>
        </Link>
      </div>
    </div>
  )
}
