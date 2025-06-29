'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { otpSchema } from '../constant'
import { OTPData } from '../interface'

interface OTPFormProps {
  readonly phoneNumber: string
  readonly onSubmit: (data: OTPData) => Promise<void>
  readonly isLoading: boolean
  readonly resendOTP: () => Promise<void>
  readonly resendCountDown: number
}

export function OTPForm({
  phoneNumber,
  onSubmit,
  isLoading,
  resendOTP,
  resendCountDown,
}: OTPFormProps) {
  const form = useForm<OTPData>({
    resolver: zodResolver(otpSchema),
  })

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#6C4534] text-center">
          Verifikasi OTP
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2">
          {`Masukkan kode OTP yang dikirim ke ${phoneNumber}`}
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Input
            {...form.register('otp_code')}
            type="text"
            maxLength={6}
            placeholder="Masukkan kode OTP (6 digit)"
            className="bg-[#F3F7F9] text-center text-lg tracking-widest"
          />
          {form.formState.errors.otp_code && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.otp_code.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6"
          variant="secondary"
        >
          {isLoading ? 'Memverifikasi...' : 'Verifikasi OTP'}
        </Button>

        <div className="text-center mt-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resendOTP}
            disabled={resendCountDown > 0 || isLoading}
            className="text-[#6C4534] hover:text-[#5A3A2A] hover:bg-transparent font-medium disabled:opacity-50"
          >
            {resendCountDown > 0
              ? `Kirim ulang dalam ${resendCountDown}s`
              : 'Kirim ulang kode OTP'}
          </Button>
        </div>
      </form>
    </>
  )
}
