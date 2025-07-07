import React from 'react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CircleCheckBig } from 'lucide-react'

export const RegistrationSuccessPage: React.FC = () => {
  return (
    <div className="w-full lg:w-1/2 h-screen relative bg-black/50 lg:bg-white flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-sm sm:max-w-lg w-full flex flex-col items-center">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-[#6C4534] mb-6 sm:mb-8">
          Akun Terverifikasi!
        </h1>
        <CircleCheckBig
          size={60}
          color="#6C4534"
          className="mb-6 sm:mb-8 sm:w-20 sm:h-20"
        />
        <p className="text-xs sm:text-sm text-center text-gray-600 mb-8 sm:mb-10">
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
