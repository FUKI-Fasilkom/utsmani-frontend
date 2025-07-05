'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { phoneSchema } from '../constant'
import { PhoneData } from '../interface'

interface PhoneFormProps {
  readonly onSubmit: (data: PhoneData) => Promise<void>
  readonly isLoading: boolean
}

export function PhoneForm({ onSubmit, isLoading }: PhoneFormProps) {
  const form = useForm<PhoneData>({
    resolver: zodResolver(phoneSchema),
  })

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#6C4534] text-center">
          Lupa Password
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 text-center mt-2">
          Masukkan nomor telepon untuk menerima kode OTP
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Input
            {...form.register('phone_number')}
            type="tel"
            placeholder="Nomor telepon (08xxxxxxxxx)"
            className="bg-[#F3F7F9]"
          />
          {form.formState.errors.phone_number && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">
              {form.formState.errors.phone_number.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6"
          variant="secondary"
        >
          {isLoading ? 'Mengirim...' : 'Kirim Kode OTP'}
        </Button>
      </form>
    </>
  )
}
