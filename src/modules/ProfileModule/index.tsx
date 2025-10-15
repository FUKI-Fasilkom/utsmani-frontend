'use client'

import React from 'react'
import { PersonalDataSection } from './sections/PersonalDataSection'
import { CertificateSection } from './sections/CertificateSection'
import { RegistrationHistorySection } from './sections/RegistrationHistorySection'
import { ProfileSidebar } from './components/ProfileSidebar'
import { ProfileTab } from './interface'

interface ProfileModuleProps {
  defaultTab: ProfileTab
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({ defaultTab }) => {
  const renderContent = () => {
    switch (defaultTab) {
      case ProfileTab.Profile:
        return <PersonalDataSection />
      case ProfileTab.Certificates:
        return <CertificateSection />
      case ProfileTab.Registrations:
        return <RegistrationHistorySection />
      default:
        return <PersonalDataSection />
    }
  }

  return (
    <div className="container mx-auto max-w-screen-xl p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <ProfileSidebar activeTab={defaultTab} />
        <main className="flex-1">{renderContent()}</main>
      </div>
    </div>
  )
}
