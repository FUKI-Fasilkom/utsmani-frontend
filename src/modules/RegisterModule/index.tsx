'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

// Zod schema untuk validasi
const schema = z
  .object({
    fullName: z.string().min(1, 'Nama Lengkap diperlukan'),
    email: z.string().email('Email tidak valid'),
    phoneNumber: z.string().min(1, 'Nomor Handphone diperlukan'),
    address: z.string().min(1, 'Alamat diperlukan'),
    password: z.string().min(6, 'Password harus lebih dari 6 karakter'),
    confirmPassword: z.string().min(6, 'Password harus lebih dari 6 karakter'),
    checkData: z
      .boolean()
      .refine((val) => val === true, 'Mohon centang checkbox ini!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  })

export const RegisterModule: React.FC = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      password: '',
      confirmPassword: '',
      checkData: false,
    },
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log('Form Submitted:', data)
  }

  return (
    <div className="container">
      <h2>Register Page</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Nama Lengkap */}
          <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nomor Handphone */}
          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Handphone</FormLabel>
                <FormControl>
                  <Input placeholder="Nomor Handphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Alamat */}
          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input placeholder="Alamat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ulangi Password */}
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ulangi Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ulangi Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checkbox untuk Terms */}
          <FormField
            name="checkData"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Mohon periksa kembali data yang diberikan</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tombol Submit */}
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  )
}
