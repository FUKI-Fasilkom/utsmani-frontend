'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuthContext } from '@/components/context'
import { useRouter } from 'next/navigation'

// Schema untuk validasi menggunakan Zod
const loginSchema = z.object({
  username: z.string().nonempty('Email/No Telepon wajib diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginModule: React.FC = () => {
  const router = useRouter()
  const { login } = useAuthContext()

  // Menggunakan useForm dengan schema Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    // Tambahkan logika login di sini (misalnya, API call)
    try {
      await login(data)
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="h-screen w-full flex">
      {/* Left Section with Image */}
      <div className="w-1/2 relative">
        <Image
          src="/assets/images/login-bg.png"
          alt="Al-Utsmani Building"
          fill
          className="h-full w-full object-cover object-left"
        />
      </div>

      {/* Right Section with Login Form */}
      <div className="w-1/2 flex flex-col items-center justify-center px-8 ">
        <div className="bg-white flex flex-col px-12 py-10 drop-shadow-lg rounded-xl w-full max-w-screen-sm">
          <h1 className="text-2xl font-semibold mb-6 text-[#6C4534]">Masuk</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              {/* Email/No Telepon Field */}
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
                        placeholder="Email/No Telepon"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Field */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#F3F7F9]"
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-12"
                variant={'secondary'}
              >
                Masuk
              </Button>
            </form>
          </Form>
          <span className="mt-4 font-light text-center">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#6C4534] font-semibold">
              Daftar
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
