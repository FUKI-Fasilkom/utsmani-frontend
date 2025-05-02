'use client'

import { Button } from '@/components/ui/button'
import { ProgramDetailProps } from '../interface'
import { useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import { LoaderCircleIcon } from 'lucide-react'
import { toast } from '@/components/ui/sonner'
import { useRouter } from 'next/navigation'

export const RegisterButton: React.FC<{
  userStatus: ProgramDetailProps['user_status']
  programId: string
}> = ({ userStatus, programId }) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const registerProgram = async () => {
    try {
      setLoading(true)
      const at = getCookie('AT')
      if (!at) {
        toast.error('Silakan login terlebih dahulu!')
        router.push('/login')
        return
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/program/${programId}/register`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${at}`,
          },
        }
      )

      const responseJson = await response.json()
      if (response.status === 401) {
        toast.error('Silahkan login kembali!')
        deleteCookie('AT')
        router.push('/login')
        return
      }
      if (responseJson.status !== 201) throw new Error(responseJson.message)
      toast.success('Berhasil mendaftar!')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button
      disabled={userStatus !== null || loading}
      onClick={registerProgram}
      className="text-white bg-[#6C4534]  lg:py-6 lg:px-6 rounded-full font-semibold lg:text-lg mt-2"
    >
      {loading ? (
        <LoaderCircleIcon className="animate-spin !w-10 !h-10" />
      ) : userStatus === null ? (
        'Daftar Sekarang'
      ) : userStatus === 'PENDING' ? (
        'Menunggu Pembayaran'
      ) : userStatus === 'ACCEPTED' ? (
        'Diterima'
      ) : (
        'Ditolak'
      )}
    </Button>
  )
}
