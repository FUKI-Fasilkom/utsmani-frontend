import * as z from 'zod'

export const phoneSchema = z.object({
  phone_number: z
    .string()
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(13, 'Nomor telepon maksimal 13 digit')
    .regex(/^08\d+$/, 'Nomor telepon harus diawali dengan 08'),
})

export const otpSchema = z.object({
  otp_code: z
    .string()
    .length(6, 'OTP harus 6 digit')
    .regex(/^\d+$/, 'OTP harus berupa angka'),
})

export const passwordSchema = z
  .object({
    new_password: z.string().min(8, 'Password minimal 8 karakter'),
    confirm_password: z.string().min(8, 'Password minimal 8 karakter'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirm_password'],
  })

export const RESEND_COUNTDOWN_SECONDS = 60
