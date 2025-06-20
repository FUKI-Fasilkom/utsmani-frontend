'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle, Loader2 } from 'lucide-react'

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string().min(8, 'Password minimal 8 karakter'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  })

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

interface ResetPasswordModuleProps {
  token: string
}

export default function ResetPasswordModule({
  token,
}: ResetPasswordModuleProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordData) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            new_password: data.newPassword,
            confirm_password: data.confirmPassword,
          }),
        }
      )

      const result = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast.success('Password berhasil direset!')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        toast.error(result.message || 'Terjadi kesalahan')
      }
    } catch (error) {
      console.error('Reset password error:', error)
      toast.error('Terjadi kesalahan jaringan')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Password Berhasil Direset!
            </h2>
            <p className="text-gray-600 mb-6">
              Password Anda telah berhasil direset. Anda akan dialihkan ke
              halaman login dalam beberapa detik.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-auto flex justify-center">
            <h1 className="text-3xl font-bold text-[#6C4534]">Al Utsmani</h1>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Masukkan password baru Anda
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Password Baru
              </label>
              <Input
                {...register('newPassword')}
                id="newPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Masukkan password baru"
                className={`mt-1 ${
                  errors.newPassword
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : ''
                }`}
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Konfirmasi Password
              </label>
              <Input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Konfirmasi password baru"
                className={`mt-1 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
