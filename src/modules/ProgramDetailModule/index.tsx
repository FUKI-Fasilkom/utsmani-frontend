'use client'

import type React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

import type { ProgramDetail, UserRegistration } from './interface'

import { HeaderSection } from './sections/HeaderSection'
import { JenjangSection } from './sections/JenjangSection'
import { OtherProgramSection } from './sections/OtherProgramSection'
import { ProgramDetailSkeleton } from './sections/ProgramDetailSkeleton'
import { CustomButton } from './module-elements/CustomButton'

const getProgramDetail = async (id: string): Promise<ProgramDetail | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/${id}`
    )
    if (!response.ok) {
      throw new Error('Gagal mengambil data program.')
    }
    const responseJson = await response.json()
    return responseJson.contents as ProgramDetail
  } catch (error: any) {
    toast.error(error.message)
    return null
  }
}

const getUserRegistrations = async (
  id: string
): Promise<UserRegistration[] | null> => {
  const token = getCookie('AT')
  if (!token) {
    return null
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/my-registrations?program_id=${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (response.status === 404) {
      return []
    }
    if (!response.ok) {
      throw new Error('Gagal mengambil riwayat pendaftaran.')
    }
    const responseJson = await response.json()
    return responseJson.contents as UserRegistration[]
  } catch (error: any) {
    toast.error(error.message)
    return null
  }
}

export const ProgramDetailModule: React.FC<{ id: string }> = ({ id }) => {
  const [programDetail, setProgramDetail] = useState<ProgramDetail | null>(null)
  const [latestRegistration, setLatestRegistration] =
    useState<UserRegistration | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [programData, registrationsData] = await Promise.all([
        getProgramDetail(id),
        getUserRegistrations(id),
      ])

      setProgramDetail(programData)

      if (registrationsData && registrationsData.length > 0) {
        const sortedRegistrations = [...registrationsData].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        setLatestRegistration(sortedRegistrations[0])
      } else {
        setLatestRegistration(null)
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memuat semua data.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return <ProgramDetailSkeleton />
  }

  if (!programDetail) {
    return (
      <div className="text-center py-20">
        Program tidak ditemukan atau gagal dimuat.
      </div>
    )
  }

  const hasLevels =
    programDetail.custom_fields?.levels &&
    programDetail.custom_fields.levels.length > 0

  return (
    <main className="flex flex-col">
      <HeaderSection
        programDetail={programDetail}
        latestRegistration={latestRegistration}
        // onRegisterSuccess={fetchData} // Me-refresh semua data setelah pendaftaran berhasil
        onRegisterSuccess={() => {}}
      />

      <section className="flex flex-col lg:flex-row p-4 md:p-14 xl:p-28 gap-10 lg:gap-20 justify-center">
        <div
          className={cn(
            'flex flex-col gap-8',
            hasLevels ? 'lg:w-1/2' : 'lg:w-4/5'
          )}
        >
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: programDetail.description }}
          />
          <CustomButton title={programDetail.title} />
        </div>

        {hasLevels && (
          <JenjangSection levels={programDetail.custom_fields!.levels!} />
        )}
      </section>

      <OtherProgramSection />
    </main>
  )
}
