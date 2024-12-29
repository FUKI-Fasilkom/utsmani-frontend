import React from 'react'
import { PersonalDataSection, CertificateSection } from './sections'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'

export const ProfileModule: React.FC = async () => {
  const userData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${getCookie('AT', { cookies })}`,
      },
    }
  )

  const userDataJson = await userData.json()
  return (
    <div className="flex flex-col gap-8">
      <PersonalDataSection {...userDataJson.contents} />
      <CertificateSection certificates={userDataJson.contents.certificates} />
    </div>
  )
}
