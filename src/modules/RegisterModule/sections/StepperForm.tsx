'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { RegisterForm } from './RegisterForm'
import { StepperFormProps } from '../interface'
import OtpVerificationPage from './OtpVerificationPage'
import { RegistrationSuccessPage } from './RegistrationSuccessPage'

export const StepperForm: React.FC<StepperFormProps> = ({ educationList }) => {
  const [step, setStep] = useState<number>(1)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  return (
    <div className="min-h-screen w-full flex justify-end">
      {/* Left Section with Image */}
      <div className="w-full absolute min-h-screen">
        <Image
          src="/assets/images/login-bg.png"
          alt="Al-Utsmani Building"
          fill
          className="h-full w-full object-cover object-left"
        />
      </div>

      {step === 1 ? (
        <RegisterForm
          educationList={educationList}
          setStep={setStep}
          setPhoneNumber={setPhoneNumber}
        />
      ) : step === 2 ? (
        <OtpVerificationPage setStep={setStep} phoneNumber={phoneNumber} />
      ) : (
        <RegistrationSuccessPage />
      )}
    </div>
  )
}
