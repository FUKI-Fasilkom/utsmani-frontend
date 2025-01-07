import Image from 'next/image'
import React from 'react'

import Link from 'next/link'
import { RegisterForm } from './sections'

// Schema untuk validasi menggunakan Zod

export const RegisterModule: React.FC = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/education`
  )
  const responseJson = await response.json()
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section with Image */}
      <div className="w-1/2 relative">
        <Image
          src="/assets/images/login-bg.png"
          alt="Al-Utsmani Building"
          fill
          className="h-full w-full object-cover object-left"
        />
      </div>

      {/* Right Section with Register Form */}
      <div className="w-1/2 flex flex-col items-center justify-center px-8 py-4">
        <div className="bg-white flex flex-col px-12 py-10 drop-shadow-lg rounded-xl w-full max-w-screen-sm">
          <h1 className="text-2xl font-semibold mb-6 text-[#6C4534]">Daftar</h1>
          <RegisterForm educationList={responseJson.contents} />
          <span className="mt-4 font-light text-center">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#6C4534] font-semibold">
              Masuk
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
