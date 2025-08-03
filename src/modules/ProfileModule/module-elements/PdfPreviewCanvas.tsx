'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react' // Import new hooks
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up the worker source (same as before)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface CertificatePreviewProps {
  fileUrl: string
  className?: string
}

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center text-gray-500">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
)

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center text-center text-red-700 p-2">
    <AlertTriangle className="h-8 w-8 mb-2" />
    <p className="font-semibold text-sm">{message}</p>
  </div>
)

const PdfPreviewCanvas: React.FC<CertificatePreviewProps> = ({
  fileUrl,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateWidth = () => {
      setContainerWidth(container.clientWidth)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center bg-gray-100 ${className}`}
    >
      {containerWidth && (
        <Document
          file={fileUrl}
          loading={<LoadingSpinner />}
          error={<ErrorMessage message="Could not load preview." />}
          className="flex items-center justify-center w-full h-full"
        >
          <Page pageNumber={1} width={containerWidth} />
        </Document>
      )}
    </div>
  )
}

export default PdfPreviewCanvas
