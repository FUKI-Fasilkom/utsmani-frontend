import ForgotPasswordModule from '@/modules/ForgotPasswordModule'

export default function ForgotPasswordPage() {
  return <ForgotPasswordModule />
}

export async function generateMetadata() {
  return {
    title: 'Lupa Password - Al Utsmani',
    description: 'Reset password akun Al Utsmani Anda menggunakan OTP',
  }
}
