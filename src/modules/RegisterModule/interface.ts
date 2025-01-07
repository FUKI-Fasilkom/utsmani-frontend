export interface Education {
  id: string
  created_at: string
  updated_at: string
  level: string
}

export interface StepForm {
  setStep: (step: number) => void
}

export interface RegisterFormProps extends StepForm {
  educationList: Education[]
  setPhoneNumber: (phoneNumber: string) => void
}

export interface StepperFormProps {
  educationList: Education[]
}

export interface OtpVerificationPageProps extends StepForm {
  phoneNumber: string
}
