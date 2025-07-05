'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { passwordSchema } from '../constant'
import { PasswordData } from '../interface'

interface PasswordFormProps {
  readonly onSubmit: (data: PasswordData) => Promise<void>
  readonly isLoading: boolean
}

export function PasswordForm({ onSubmit, isLoading }: PasswordFormProps) {
  const form = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
  })

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#6C4534] text-center">
          Reset Password
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 text-center mt-2">
          Masukkan password baru Anda
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Input
            {...form.register('new_password')}
            type="password"
            placeholder="Password baru"
            className="bg-[#F3F7F9]"
          />
          {form.formState.errors.new_password && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">
              {form.formState.errors.new_password.message}
            </p>
          )}
        </div>

        <div>
          <Input
            {...form.register('confirm_password')}
            type="password"
            placeholder="Konfirmasi password baru"
            className="bg-[#F3F7F9]"
          />
          {form.formState.errors.confirm_password && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">
              {form.formState.errors.confirm_password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6"
          variant="secondary"
        >
          {isLoading ? 'Memproses...' : 'Reset Password'}
        </Button>
      </form>
    </>
  )
}
