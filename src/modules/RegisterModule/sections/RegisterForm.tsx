'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RegisterFormProps } from '../interface'
import { useRouter } from 'next/navigation'

// Schema untuk validasi menggunakan Zod
const registerSchema = z.object({
  username: z.string().nonempty('Username wajib diisi'),
  fullname: z.string().nonempty('Nama Lengkap wajib diisi'),
  phone_number: z.string().nonempty('Nomor Telepon wajib diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  gender: z.string().nonempty('Jenis Kelamin wajib dipilih'),
  education_level: z.string().nonempty('Pendidikan Terakhir wajib dipilih'),
  address: z.string().nonempty('Alamat Lengkap wajib diisi'),
  birthdate: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'Tanggal lahir tidak valid (format: YYYY-MM-DD)'
    ),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export const RegisterForm: React.FC<RegisterFormProps> = ({
  educationList,
}) => {
  const router = useRouter()
  // Menggunakan useForm dengan schema Zod
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      fullname: '',
      phone_number: '',
      password: '',
      gender: '',
      education_level: '',
      address: '',
      birthdate: '', // Default value untuk tanggal lahir
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        }
      )
      const responseJson = await response.json()
      if (responseJson.status !== 200) throw new Error(responseJson.errors)
      router.push('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {/* Username Field */}
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
                  placeholder="Username"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Nama Lengkap Field */}
        <FormField
          name="fullname"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#F3F7F9]"
                  type="text"
                  placeholder="Nama Lengkap"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nomor Telepon Field */}
        <FormField
          name="phone_number"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#F3F7F9]"
                  type="text"
                  placeholder="Nomor Telepon"
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

        {/* Jenis Kelamin Select */}
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-[#F3F7F9]">
                    <SelectValue placeholder="Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Laki-laki</SelectItem>
                    <SelectItem value="FEMALE">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pendidikan Terakhir Select */}
        <FormField
          name="education_level"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-[#F3F7F9]">
                    <SelectValue placeholder="Pendidikan Terakhir" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationList.map((education) => (
                      <SelectItem key={education.id} value={education.id}>
                        {education.level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alamat Lengkap Field */}
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#F3F7F9]"
                  type="text"
                  placeholder="Alamat Lengkap"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Birthdate Field */}
        <FormField
          name="birthdate"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#F3F7F9]"
                  type="date"
                  placeholder="Tanggal Lahir"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-12" variant={'secondary'}>
          Daftar
        </Button>
      </form>
    </Form>
  )
}
