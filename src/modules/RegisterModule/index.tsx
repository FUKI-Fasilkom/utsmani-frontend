import React from 'react'

import { StepperForm } from './sections/StepperForm'

// Schema untuk validasi menggunakan Zod

async function getEducationList() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/education`,
      { cache: 'no-store' }
    )
    const responseJson = await response.json()
    return responseJson.contents ?? []
  } catch (error) {
    console.error('Error fetching education list:', error)
    return []
  }
}

export const RegisterModule: React.FC = async () => {
  const educationList = await getEducationList()
  return <StepperForm educationList={educationList} />
}
