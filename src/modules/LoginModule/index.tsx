'use client'

import { useAuthContext } from '@/components/context'
import {
  GetUserResponse,
  LoginResponse,
} from '@/components/context/AuthContext/interface'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().nonempty('Username/No Telepon wajib diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

type LoginFormValues = z.infer<typeof loginSchema>

// --- Sub-component for the Login Form ---
interface LoginFormProps {
  login: (data: LoginFormValues) => Promise<LoginResponse>
  getUser: () => Promise<GetUserResponse | undefined>
}

const LoginForm: React.FC<LoginFormProps> = ({ login, getUser }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data)
      toast.success('Login berhasil!')
      const nextPage = searchParams.get('next') || '/'
      router.replace(nextPage)
      await getUser()
    } catch (err: any) {
      if (err.message === 'Nomor telepon Anda belum diverifikasi.') {
        router.push('/login/verification')
      }
      toast.error(err.message || 'Login gagal, silakan coba lagi.')
    }
  }

  return (
    <div className="bg-white flex flex-col px-6 sm:px-8 lg:px-12 py-8 lg:py-10 drop-shadow-lg rounded-xl w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-6 text-[#6C4534]">Masuk</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-[#F3F7F9]"
                    type="text"
                    placeholder="Username/No Telepon"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F3F7F9] pr-10" // Add padding to not overlap with icon
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? 'Sembunyikan password'
                        : 'Tampilkan password'
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-1">
            <Link
              href="/forgot-password"
              className="text-sm text-[#6C4534] hover:text-[#5A3A2A] font-medium transition-colors"
            >
              Lupa Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full !mt-6"
            variant={'secondary'}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>
      </Form>
      <span className="mt-6 font-light text-center text-sm sm:text-base">
        Belum punya akun?{' '}
        <Link href="/register" className="text-[#6C4534] font-semibold">
          Daftar
        </Link>
      </span>
    </div>
  )
}

// --- Sub-component for the background image ---

const LoginImage: React.FC = () => (
  <div className="w-full lg:w-1/2 relative h-48 lg:h-auto">
    <Image
      src="/assets/images/login-bg.png"
      alt="Al-Utsmani Building"
      fill
      priority // Good for LCP (Largest Contentful Paint)
      className="h-full w-full object-cover object-center lg:object-left"
    />
  </div>
)

// --- Main Page Component ---

export const LoginModule: React.FC = () => {
  const { login, getUser } = useAuthContext()

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      <LoginImage />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <LoginForm login={login} getUser={getUser} />
      </div>
    </div>
  )
}
