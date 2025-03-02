import React from 'react'
import { PersonalDataSection, CertificateSection } from './sections'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'

export const ProfileModule: React.FC = async () => {
  const [userData, education] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${getCookie('AT', { cookies })}`,
      },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/education`),
  ])

  const userDataJson = await userData.json()
  const educationJson = await education.json()
  return (
    <div className="flex flex-col gap-8">
      <PersonalDataSection
        {...userDataJson.contents}
        educationList={educationJson.contents}
      />
      <CertificateSection certificates={userDataJson.contents.certificates} />
    </div>
  )
}
