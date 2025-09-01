'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { ProgramDetail, UserRegistration } from '../interface'
import { BranchSelectionModal } from '../module-elements/BranchSelectionModal'

interface HeaderSectionProps {
  programDetail: ProgramDetail
  latestRegistration: UserRegistration | null
  onRegisterSuccess: () => void
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  programDetail,
  latestRegistration,
  onRegisterSuccess,
}) => {
  const [branchModalOpen, setBranchModalOpen] = React.useState(false)

  const getButtonText = () => {
    if (!latestRegistration) return 'Pilih Cabang dan Daftar'

    // Jika sudah ada pendaftaran, kita bisa memberikan teks yang lebih kontekstual
    // Misalnya, "Daftar Lagi / Naik Level" atau tetap "Pilih Cabang & Daftar"
    return 'Pilih Cabang & Daftar'
  }

  return (
    <>
      <section className="flex flex-col lg:flex-row w-full lg:h-[536px] bg-[#F8EAD9] justify-left items-center">
        <div className="w-full max-h-72 lg:max-h-none lg:max-w-[55%] h-full relative overflow-hidden flex items-center">
          <Image
            src={programDetail.cover_image || '/placeholder.svg'}
            alt={programDetail.title}
            width={1000}
            height={1000}
            className="object-cover lg:pr-16 w-full h-full"
          />
        </div>
        <div className="lg:w-[45%] flex flex-col gap-2 py-10 lg:py-4 lg:gap-6 px-2 lg:pr-12">
          <h2 className="text-center lg:text-start lg:text-3xl font-bold text-[#A0653C]">
            {programDetail.title}
          </h2>
          <h1 className="text-center lg:text-start lg:text-4xl font-bold text-[#6C4534]">
            {programDetail.headline}
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <Button
              size={'lg'}
              className="px-12 py-6 bg-brown hover:bg-brown/90"
              onClick={() => setBranchModalOpen(true)}
            >
              <span className="paragraph-lg font-semibold">
                {getButtonText()}
              </span>
            </Button>
          </div>
        </div>
      </section>

      <BranchSelectionModal
        programId={programDetail.id}
        isOpen={branchModalOpen}
        onClose={() => setBranchModalOpen(false)}
        onRegisterSuccess={onRegisterSuccess}
        userRegistration={latestRegistration}
      />
    </>
  )
}
