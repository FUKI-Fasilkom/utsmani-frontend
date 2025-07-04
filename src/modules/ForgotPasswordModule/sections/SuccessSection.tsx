'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function SuccessSection() {
  const router = useRouter()

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#6C4534] text-center">
          Berhasil
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2">
          Password berhasil direset
        </p>
      </div>

      {/* Success Content */}
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[#6C4534] mb-2">
          Password Berhasil Direset
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Anda sekarang dapat login dengan password baru
        </p>

        <Button
          onClick={() => router.push('/login')}
          className="w-full"
          variant="secondary"
        >
          Kembali ke Login
        </Button>
      </div>
    </>
  )
}
