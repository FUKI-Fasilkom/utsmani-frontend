'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ConfirmationResult } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { RESEND_COUNTDOWN_SECONDS } from './constant'
import { PhoneForm, OTPForm, PasswordForm, SuccessSection } from './sections'
import { FirebaseRecaptchaHelper, forgotPasswordApi } from './module-elements'
import {
  ForgotPasswordStep,
  PhoneData,
  OTPData,
  PasswordData,
} from './interface'

export default function ForgotPasswordModule() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null)
  const [resendCountDown, setResendCountDown] = useState<number>(0)

  // Firebase helper
  const firebaseHelperRef = useRef<FirebaseRecaptchaHelper | null>(null)

  useEffect(() => {
    firebaseHelperRef.current = new FirebaseRecaptchaHelper()
    return () => {
      firebaseHelperRef.current?.cleanup()
    }
  }, [])

  // Step 1: Submit phone number and create session
  const onSubmitPhone = async (data: PhoneData) => {
    setIsLoading(true)
    try {
      const response = await forgotPasswordApi.forgotPassword({
        phone_number: data.phone_number,
      })

      if (response.status === 200) {
        const receivedSessionId = response.contents?.data?.session_id ?? ''

        setPhoneNumber(data.phone_number)
        setSessionId(receivedSessionId)

        if (!receivedSessionId) {
          throw new Error('Session ID tidak diterima dari server')
        }

        const confirmationResult = await firebaseHelperRef.current!.sendOTP(
          data.phone_number
        )

        setConfirmationResult(confirmationResult)
        setCurrentStep('otp')
        setResendCountDown(RESEND_COUNTDOWN_SECONDS)
        toast.success('Kode OTP telah dikirim ke nomor telepon Anda')
      }
    } catch (error: any) {
      console.error('Error in phone submission:', error)
      toast.error(error.message ?? 'Gagal mengirim OTP')
    } finally {
      setIsLoading(false)
    }
  }

  // Step 2: Verify OTP with Firebase and backend
  const onSubmitOTP = async (data: OTPData) => {
    setIsLoading(true)
    try {
      if (!confirmationResult) {
        throw new Error('Session Firebase tidak ditemukan')
      }

      if (!sessionId) {
        throw new Error(
          'Session ID tidak ditemukan. Silakan mulai ulang proses reset password.'
        )
      }

      const userCredential = await confirmationResult.confirm(data.otp_code)
      const firebaseUid = userCredential.user.uid

      const requestData = {
        phone_number: phoneNumber,
        firebase_uid: firebaseUid,
        session_id: sessionId,
      }

      const response = await forgotPasswordApi.verifyOTP(requestData)

      if (response.status === 200) {
        setCurrentStep('password')
        toast.success('OTP berhasil diverifikasi')
      }
    } catch (error: any) {
      console.error('Error in OTP verification:', error)
      toast.error(error.message ?? 'OTP tidak valid')
    } finally {
      setIsLoading(false)
    }
  }

  // Step 3: Reset password
  const onSubmitPassword = async (data: PasswordData) => {
    setIsLoading(true)
    try {
      const response = await forgotPasswordApi.resetPassword({
        phone_number: phoneNumber,
        session_id: sessionId,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      })

      if (response.status === 200) {
        setCurrentStep('success')
        toast.success('Password berhasil direset')
      }
    } catch (error: any) {
      console.error('Error in password reset:', error)
      toast.error(error.message ?? 'Gagal mereset password')
    } finally {
      setIsLoading(false)
    }
  }

  // Resend OTP
  const resendOTP = async () => {
    if (resendCountDown > 0) return

    setIsLoading(true)
    try {
      const confirmationResult =
        await firebaseHelperRef.current!.sendOTP(phoneNumber)

      setConfirmationResult(confirmationResult)
      setResendCountDown(RESEND_COUNTDOWN_SECONDS)
      toast.success('Kode OTP baru telah dikirim')
    } catch (error: any) {
      console.error('Error resending OTP:', error)
      toast.error('Gagal mengirim ulang OTP')
    } finally {
      setIsLoading(false)
    }
  }

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendCountDown > 0) {
      timer = setTimeout(() => {
        setResendCountDown((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [resendCountDown])

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Section with Image */}
      <div className="w-full lg:w-1/2 relative h-48 lg:h-auto">
        <img
          src="/assets/images/login-bg.png"
          alt="Al-Utsmani Building"
          className="h-full w-full object-cover object-center lg:object-left"
        />
      </div>

      {/* Right Section with Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
        <div className="bg-white flex flex-col px-6 sm:px-8 lg:px-12 py-8 lg:py-10 drop-shadow-lg rounded-xl w-full max-w-md lg:max-w-screen-sm">
          {/* Render current step */}
          {currentStep === 'phone' && (
            <PhoneForm onSubmit={onSubmitPhone} isLoading={isLoading} />
          )}

          {currentStep === 'otp' && (
            <OTPForm
              phoneNumber={phoneNumber}
              onSubmit={onSubmitOTP}
              isLoading={isLoading}
              resendOTP={resendOTP}
              resendCountDown={resendCountDown}
            />
          )}

          {currentStep === 'password' && (
            <PasswordForm onSubmit={onSubmitPassword} isLoading={isLoading} />
          )}

          {currentStep === 'success' && <SuccessSection />}

          {/* Back button for phone and otp steps */}
          {(currentStep === 'phone' ||
            currentStep === 'otp' ||
            currentStep === 'password') && (
            <div className="text-center mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/login')}
                className="text-[#6C4534] hover:text-[#5A3A2A] hover:bg-transparent font-medium"
              >
                Kembali ke login
              </Button>
            </div>
          )}

          {/* Firebase reCAPTCHA container */}
          <div id="recaptcha-container" className="hidden"></div>
        </div>
      </div>
    </div>
  )
}
