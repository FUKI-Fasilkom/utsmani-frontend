'use client'

import React, { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { UserRegistration } from '../interface'
import { FileText } from 'lucide-react'
import { RegistrationCard } from '../module-elements/RegistrationCard'

const fetchRegistrations = async (): Promise<UserRegistration[]> => {
  try {
    const at = getCookie('AT')
    if (!at) {
      return []
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/my-registrations`,
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
        cache: 'no-store',
      }
    )
    if (response.status === 404) {
      return []
    }
    if (!response.ok) {
      throw new Error('Gagal memuat riwayat pendaftaran.')
    }
    const responseJson = await response.json()
    return responseJson.contents || []
  } catch (error: any) {
    toast.error(error.message)
    return []
  }
}

const renderEmptyState = (type: string) => (
  <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
    <FileText className="h-16 w-16 mb-4" />
    <h3 className="text-lg font-medium mb-2">
      Belum ada pendaftaran dengan status {type.toLowerCase()}
    </h3>
  </div>
)

export const RegistrationHistorySection: React.FC = () => {
  const [registrations, setRegistrations] = useState<UserRegistration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const data = await fetchRegistrations()
      setRegistrations(data)
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-10 w-1/2 bg-gray-200 rounded-md animate-pulse mb-6" />
        <div className="h-40 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    )
  }

  const pendingList = registrations.filter((r) => r.status === 'PENDING')
  const acceptedList = registrations.filter((r) => r.status === 'ACCEPTED')
  const declinedList = registrations.filter((r) => r.status === 'DECLINED')

  return (
    <div className="w-full">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
          <TabsTrigger
            value="pending"
            className="data-[state=active]:border-b-2 data-[state=active]:border-brown rounded-none data-[state=active]:text-gray-800 data-[state=active]:shadow-none bg-transparent"
          >
            Menunggu Konfirmasi ({pendingList.length})
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="data-[state=active]:border-b-2 data-[state=active]:border-brown rounded-none data-[state=active]:text-gray-800 data-[state=active]:shadow-none bg-transparent"
          >
            Diterima ({acceptedList.length})
          </TabsTrigger>
          <TabsTrigger
            value="declined"
            className="data-[state=active]:border-b-2 data-[state=active]:border-brown rounded-none data-[state=active]:text-gray-800 data-[state=active]:shadow-none bg-transparent"
          >
            Ditolak ({declinedList.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {pendingList.length > 0 ? (
            <div className="space-y-4">
              {pendingList.map((reg) => (
                <RegistrationCard key={reg.id} registration={reg} />
              ))}
            </div>
          ) : (
            renderEmptyState('menunggu konfirmasi')
          )}
        </TabsContent>
        <TabsContent value="accepted" className="mt-6">
          {acceptedList.length > 0 ? (
            <div className="space-y-4">
              {acceptedList.map((reg) => (
                <RegistrationCard key={reg.id} registration={reg} />
              ))}
            </div>
          ) : (
            renderEmptyState('diterima')
          )}
        </TabsContent>
        <TabsContent value="declined" className="mt-6">
          {declinedList.length > 0 ? (
            <div className="space-y-4">
              {declinedList.map((reg) => (
                <RegistrationCard key={reg.id} registration={reg} />
              ))}
            </div>
          ) : (
            renderEmptyState('ditolak')
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
