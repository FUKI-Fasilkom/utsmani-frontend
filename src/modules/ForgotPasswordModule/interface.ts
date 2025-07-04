import { ConfirmationResult } from 'firebase/auth'

export interface PhoneData {
  phone_number: string
}

export interface OTPData {
  otp_code: string
}

export interface PasswordData {
  new_password: string
  confirm_password: string
}

export type ForgotPasswordStep = 'phone' | 'otp' | 'password' | 'success'

export interface ForgotPasswordState {
  currentStep: ForgotPasswordStep
  phoneNumber: string
  sessionId: string
  isLoading: boolean
  confirmationResult: ConfirmationResult | null
  resendCountDown: number
}

export interface ForgotPasswordActions {
  setCurrentStep: (step: ForgotPasswordStep) => void
  setPhoneNumber: (phone: string) => void
  setSessionId: (id: string) => void
  setIsLoading: (loading: boolean) => void
  setConfirmationResult: (result: ConfirmationResult | null) => void
  setResendCountDown: (count: number) => void
  onSubmitPhone: (data: PhoneData) => Promise<void>
  onSubmitOTP: (data: OTPData) => Promise<void>
  onSubmitPassword: (data: PasswordData) => Promise<void>
  resendOTP: () => Promise<void>
}
