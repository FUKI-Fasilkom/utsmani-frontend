'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { FileText, Calendar, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import type { Certificate } from '../interface'

const PdfPreviewCanvas = dynamic(
  () => import('../module-elements/PdfPreviewCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-gray-200">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    ),
  }
)

const fetchCertificates = async (): Promise<Certificate[]> => {
  const at = getCookie('AT')
  if (!at) return []
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/certificates`,
      { headers: { Authorization: `Bearer ${at}` }, cache: 'no-store' }
    )
    if (response.status === 404) return []
    if (!response.ok) throw new Error('Gagal memuat sertifikat & rapor.')
    const data = await response.json()
    return data.contents || []
  } catch (error: any) {
    toast.error(error.message)
    return []
  }
}

export const CertificateSection: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null)

  useEffect(() => {
    fetchCertificates().then((data) => {
      setCertificates(data)
      setLoading(false)
    })
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
    return new Intl.DateTimeFormat('id-ID', options).format(
      new Date(dateString)
    )
  }

  const handleCertificateView = (certificate: Certificate) => {
    if (window.innerWidth < 768) {
      window.open(certificate.file_url, '_blank')
    } else {
      setSelectedCertificate(certificate)
      setIsDialogOpen(true)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    )
  }

  const certificatesList = certificates.filter(
    (cert) => cert.type === 'CERTIFICATE'
  )
  const reportsList = certificates.filter((cert) => cert.type === 'REPORT')

  const renderCertificateCard = (certificate: Certificate) => (
    <Card
      key={certificate.id}
      className="group cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={() => handleCertificateView(certificate)}
    >
      <CardContent className="p-4">
        <div
          className={`relative w-full mb-4 bg-gray-100 rounded-lg overflow-hidden border ${
            certificate.type === 'CERTIFICATE'
              ? 'aspect-[1.43/1]'
              : 'aspect-[1/1.414]'
          }`}
        >
          <PdfPreviewCanvas
            fileUrl={certificate.file_url}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white">
              <FileText className="h-12 w-12 mx-auto mb-3" />
              <p className="text-sm font-medium">Lihat Detail</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-brown transition-colors">
            {certificate.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Diterbitkan {formatDate(certificate.issued_at)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderEmptyState = (type: string) => (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
      <FileText className="h-16 w-16 mb-4" />
      <h3 className="text-lg font-medium mb-2">
        Belum ada {type.toLowerCase()}
      </h3>
    </div>
  )

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Sertifikat & Rapor
      </h2>
      <p className="text-gray-500 mb-6">
        Lihat semua sertifikat dan rapor perkembangan Anda di sini.
      </p>
      <Tabs defaultValue="certificates" className="w-full">
        <TabsList className="justify-start rounded-none bg-transparent p-0">
          <TabsTrigger
            value="certificates"
            className="data-[state=active]:border-b-2 data-[state=active]:border-brown rounded-none data-[state=active]:text-gray-800 data-[state=active]:shadow-none bg-transparent text-base"
          >
            Sertifikat ({certificatesList.length})
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:border-b-2 data-[state=active]:border-brown rounded-none data-[state=active]:text-gray-800 data-[state=active]:shadow-none bg-transparent text-base"
          >
            Rapor ({reportsList.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="certificates" className="mt-6">
          {certificatesList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificatesList.map(renderCertificateCard)}
            </div>
          ) : (
            renderEmptyState('Sertifikat')
          )}
        </TabsContent>
        <TabsContent value="reports" className="mt-6">
          {reportsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportsList.map(renderCertificateCard)}
            </div>
          ) : (
            renderEmptyState('Rapor')
          )}
        </TabsContent>
      </Tabs>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay />
        <DialogContent className="max-w-4xl max-h-[90vh] h-full w-full p-0">
          <div className="relative w-full h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <DialogTitle className="text-lg font-semibold">
                {selectedCertificate?.title}
              </DialogTitle>
            </div>
            {selectedCertificate && (
              <div className="w-full flex-1 h-0">
                <iframe
                  src={selectedCertificate.file_url}
                  className="w-full h-full border-none"
                  title={selectedCertificate.title}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
