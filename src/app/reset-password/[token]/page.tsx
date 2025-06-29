import ResetPasswordModule from '@/modules/ResetPasswordModule'

interface ResetPasswordPageProps {
  readonly params: Promise<{
    token: string
  }>
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { token } = await params
  return <ResetPasswordModule token={token} />
}

export async function generateMetadata() {
  return {
    title: 'Reset Password - Al Utsmani',
    description: 'Reset password akun Al Utsmani Anda',
  }
}
