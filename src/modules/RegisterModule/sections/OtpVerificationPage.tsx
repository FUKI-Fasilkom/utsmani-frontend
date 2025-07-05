import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { OtpVerificationPageProps } from '../interface'
import { auth } from '@/components/utils'
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'

export const OtpVerificationPage: React.FC<OtpVerificationPageProps> = ({
  setStep,
  phoneNumber,
}) => {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', '']) // Menyimpan OTP di setiap input
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null)
  const [resendCountDown, setResendCountDown] = useState<number>(0)

  // Menggunakan useRef untuk menyimpan instance RecaptchaVerifier
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null)

  const handleInputChange = (value: string, index: number) => {
    if (value.length > 1) return // Mencegah lebih dari 1 karakter per input
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Pindah ke input berikutnya jika ada
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      if (nextInput) (nextInput as HTMLInputElement).focus()
    }
  }

  // Fungsi untuk mengirim OTP
  const handleSendOtp = async () => {
    // Cek apakah RecaptchaVerifier sudah dirender
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
        }
      )
    }

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifierRef.current
      )
      setConfirmationResult(confirmationResult)
      setResendCountDown(60) // Atur ulang countdown
    } catch (error) {
      console.error('Error sending OTP:', error)
      alert('Failed to send OTP')
    }
  }

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('') // Gabungkan OTP menjadi string

    if (!confirmationResult) {
      alert('No verification ID found. Please try again.')
      router.push('/register') // Redirect ke halaman registrasi jika confirmationResult hilang
      return
    }

    try {
      const userResult = await confirmationResult.confirm(enteredOtp)

      alert('OTP berhasil diverifikasi!')
      console.log('User:', userResult.user)
      setStep(3)
    } catch (error) {
      console.error('Error verifying OTP:', error)
      alert('OTP tidak valid.')
    }
  }

  useEffect(() => {
    handleSendOtp() // Kirim OTP saat komponen pertama kali dirender
    setResendCountDown(60) // Atur ulang countdown
  }, [])

  // useEffect untuk countdown
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (resendCountDown > 0) {
      timer = setTimeout(() => {
        setResendCountDown((prev) => prev - 1)
      }, 1000) // Kurangi 1 setiap 1 detik
    }

    return () => {
      clearTimeout(timer) // Bersihkan timer untuk mencegah memory leak
    }
  }, [resendCountDown])

  return (
    <div className="w-full lg:w-1/2 h-screen relative bg-black/50 lg:bg-white flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-sm sm:max-w-md w-full">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-[#6C4534]">
          Verifikasi OTP
        </h1>
        <p className="text-xs sm:text-sm text-center text-gray-600 mb-6">
          Masukkan 6 digit kode OTP yang dikirimkan ke nomor{' '}
          <span className="text-[#6C4534]">{phoneNumber}</span>
        </p>
        <div className="flex justify-center gap-2 sm:gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#6C4534]"
            />
          ))}
        </div>
        <Button
          variant={'secondary'}
          className="w-full"
          onClick={handleVerifyOtp}
        >
          Verifikasi
        </Button>
        <div id="recaptcha-container"></div>
        <button
          disabled={resendCountDown !== 0}
          className={`mx-auto block mt-4 text-sm text-[#6C4534] ${
            resendCountDown !== 0 && 'opacity-60'
          } font-medium`}
          onClick={handleSendOtp}
        >
          Kirim Ulang {resendCountDown !== 0 && `(${resendCountDown})`}
        </button>
      </div>
    </div>
  )
}

export default OtpVerificationPage
