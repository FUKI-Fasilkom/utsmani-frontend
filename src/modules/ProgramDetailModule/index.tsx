'use client'
import Image from 'next/image'
import type React from 'react'

import { getCookie, deleteCookie } from 'cookies-next'
import { CustomButton } from './module-elements/CustomButton'
import type { ProgramDetailModuleProps, ProgramDetailProps } from './interface'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { OtherProgramSection } from './sections/OtherProgramSection'
import { BranchSelectionModal } from './module-elements/BranchSelectionModal'
import { RegistrationDetailModal } from './module-elements/RegistrationDetailModal'
import { JenjangSection } from './sections/JenjangSection'

export const ProgramDetailModule: React.FC<ProgramDetailModuleProps> = ({
  id,
}) => {
  const router = useRouter()
  const [programDetail, setProgramDetail] = useState<ProgramDetailProps | null>(
    null
  )
  const [branchModalOpen, setBranchModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  const getProgramDetail = async () => {
    const at = getCookie('AT')
    try {
      const headers = at ? { Authorization: `Bearer ${at}` } : undefined
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/program/${id}`,
        {
          headers,
          cache: 'no-store',
        }
      )
      const responseJson = await response.json()

      if (
        responseJson.status === 401 ||
        responseJson.message === 'Token is invalid or expired'
      ) {
        deleteCookie('AT')
        router.push('/login')
        return
      }

      setProgramDetail(responseJson.contents)
    } catch (error) {
      toast.error('Terjadi kesalahan dalam mengambil data!')
    }
  }

  useEffect(() => {
    getProgramDetail()
  }, [id, router])

  if (!programDetail) {
    return <div>Loading...</div>
  }

  // Find the registered branch if user has registered
  const registeredBranch =
    programDetail.user_status !== null && programDetail.branches.length > 0
      ? programDetail.branches[0] // Assuming the first branch is the registered one
      : null

  return (
    <main className="flex flex-col">
      <section className="flex flex-col lg:flex-row w-full lg:h-[536px] bg-[#F8EAD9] justify-left items-center">
        <div className="w-full max-h-72 lg:max-h-none lg:max-w-[40%] h-full relative overflow-hidden flex items-center">
          <Image
            src={programDetail.cover_image || '/placeholder.svg'}
            alt={programDetail.title}
            width={1000}
            height={1000}
            className="object-cover lg:pr-16 w-full h-full"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-2 py-10 lg:py-4 lg:gap-6 px-2 lg:pr-12">
          <h2 className="text-center lg:text-start lg:text-3xl font-bold text-[#A0653C]">
            {programDetail.title}
          </h2>
          <h1 className="text-center lg:text-start lg:text-4xl font-bold text-[#6C4534]">
            {programDetail.headline}
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <Button
              size={'lg'}
              className="px-12 py-6"
              onClick={() => {
                if (programDetail.user_status === null) {
                  setBranchModalOpen(true)
                } else {
                  setDetailsModalOpen(true)
                }
              }}
            >
              <span className="paragraph-lg font-semibold">
                {programDetail.user_status === null
                  ? 'Pilih Cabang dan Daftar'
                  : 'Lihat Pendaftaran'}
              </span>
            </Button>
          </div>
        </div>

        <BranchSelectionModal
          programId={programDetail.id}
          branches={programDetail.branches}
          isOpen={branchModalOpen}
          onClose={() => setBranchModalOpen(false)}
          onRegisterSuccess={() => {
            getProgramDetail() // Refresh data after registration
          }}
        />

        <RegistrationDetailModal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          branch={registeredBranch}
          user_status={programDetail.user_status}
          cp_wa_number_1={programDetail.cp_wa_number_1}
        />
      </section>

      <section className="flex flex-col lg:flex-row p-4 md:p-14 xl:p-28 gap-10 lg:gap-20 justify-center">
        <div className="flex flex-col lg:w-1/2 gap-8 lg:max-w-[606px]">
          <div
            dangerouslySetInnerHTML={{ __html: programDetail.description }}
          ></div>
          <CustomButton title={programDetail.title} />
        </div>
        {programDetail.custom_fields && programDetail.custom_fields.levels && (
          <JenjangSection
            levels={programDetail.custom_fields.levels.map((level) => ({
              name: level.name,
              description: level.description,
            }))}
          />
        )}
      </section>

      <OtherProgramSection />
    </main>
  )
}
