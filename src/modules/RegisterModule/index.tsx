import React from 'react'

import { StepperForm } from './sections/StepperForm'

// Schema untuk validasi menggunakan Zod

export const RegisterModule: React.FC = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/education`
  )
  const responseJson = await response.json()
  return <StepperForm educationList={responseJson.contents} />
}
