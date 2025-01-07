'use client'

import { Button } from '@/components/ui/button'
import { ProgramDetailProps } from '../interface'
import { useState } from 'react'
import { getCookie } from 'cookies-next'
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/program/${programId}/register`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getCookie('AT')}`,
          },
        }
      )

      const responseJson = await response.json()
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
      className="text-white bg-[#6C4534] w-[17rem] h-16 rounded-full font-semibold text-xl mt-2"
    >
      {loading ? (
        <LoaderCircleIcon className="animate-spin !w-10 !h-10" />
      ) : userStatus === null ? (
        'Daftar Sekarang'
      ) : userStatus === 'PENDING' ? (
        'Pending'
      ) : userStatus === 'ACCEPTED' ? (
        'Diterima'
      ) : (
        'Ditolak'
      )}
    </Button>
  )
}
