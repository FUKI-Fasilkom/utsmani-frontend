'use client'

import type React from 'react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, FileText, Calendar } from 'lucide-react'

interface Certificate {
  id: string
  title: string
  type: 'CERTIFICATE' | 'REPORT'
  recipient_name: string
  file_url: string
  issued_at: string
}

interface CertificateSectionProps {
  certificates: Certificate[]
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({
  certificates,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null)

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
    setSelectedCertificate(certificate)
    setIsDialogOpen(true)
  }

  const certificatesList = certificates.filter(
    (cert) => cert.type === 'CERTIFICATE'
  )
  const reportsList = certificates.filter((cert) => cert.type === 'REPORT')

  const renderCertificateCard = (certificate: Certificate) => (
    <Card
      key={certificate.id}
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-[#6C4534]/30"
      onClick={() => handleCertificateView(certificate)}
    >
      <CardContent className="p-4">
        {/* PDF Preview */}
        <div
          className={`relative w-full mb-4 bg-gray-100 rounded-lg overflow-hidden border ${
            certificate.type === 'CERTIFICATE'
              ? 'aspect-[1.43/1]'
              : 'aspect-[1/1.414]'
          }`}
        >
          {/* PDF first page preview - shown by default */}
          <iframe
            src={`${certificate.file_url}#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
            className="absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none"
            title={`Preview of ${certificate.title}`}
          />

          {/* Hover overlay - shown on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white">
              <FileText className="h-12 w-12 mx-auto mb-3" />
              <p className="text-sm font-medium">Click to view full document</p>
            </div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-[#6C4534] line-clamp-2 group-hover:text-[#8B5A3C] transition-colors">
            {certificate.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Diterbitkan {formatDate(certificate.issued_at)}</span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#6C4534]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
      </CardContent>
    </Card>
  )

  const renderEmptyState = (type: string) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileText className="h-16 w-16 text-[#6C4534] mb-4" />
      <h3 className="text-lg font-medium mb-2">
        Belum ada {type.toLowerCase()}
      </h3>
    </div>
  )

  return (
    <section className="flex flex-col relative items-center gap-6 bg-[#EEDAC6] min-h-96 py-8">
      {/* Heading */}
      <h2 className="rounded-full bg-[#6C4534] text-white font-semibold text-3xl w-fit text-center px-7 py-4 -top-16 relative z-10">
        Sertifikat & Rapor
      </h2>
      <hr className="absolute h-1 bg-[#6C4534] w-1/2 z-0 -top-0.5" />

      {/* Tabs for Certificate and Report */}
      <div className="container max-w-screen-xl px-4">
        <Tabs defaultValue="certificates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50">
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-[#6C4534] data-[state=active]:text-white"
            >
              Sertifikat ({certificatesList.length})
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-[#6C4534] data-[state=active]:text-white"
            >
              Rapor ({reportsList.length})
            </TabsTrigger>
          </TabsList>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            {certificatesList.length === 0 ? (
              renderEmptyState('Sertifikat')
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {certificatesList.map(renderCertificateCard)}
              </div>
            )}
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            {reportsList.length === 0 ? (
              renderEmptyState('Rapor')
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {reportsList.map(renderCertificateCard)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Full Screen PDF Viewer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="bg-[rgb(0_0_0_/_0.001)]" />
        <DialogContent className="max-w-full max-h-full w-screen h-screen px-12 py-8 border-none bg-transparent">
          <div className="relative w-full h-full">
            {/* Header with title and close button */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm z-50">
              <DialogTitle className="text-white text-lg font-semibold">
                {selectedCertificate?.type === 'CERTIFICATE'
                  ? 'Sertifikat'
                  : 'Rapor'}
                : {selectedCertificate?.title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* PDF Viewer */}
            {selectedCertificate && (
              <div className="w-full h-full pt-16">
                <iframe
                  src={selectedCertificate.file_url}
                  className="w-full h-full border-none"
                  title={selectedCertificate.title}
                  allow="fullscreen"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
