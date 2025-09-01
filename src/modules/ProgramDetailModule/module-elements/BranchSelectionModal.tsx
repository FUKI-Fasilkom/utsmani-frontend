'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { ExternalLink, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { BranchProgram, Fee, UserRegistration } from '../interface'

interface BranchSelectionModalProps {
  programId: string
  isOpen: boolean
  onClose: () => void
  onRegisterSuccess: () => void
  userRegistration: UserRegistration | null // Prop untuk info pendaftaran terakhir
}

const groupFeesByCategory = (fees: Fee[]): Record<string, Fee[]> => {
  return fees.reduce(
    (acc, fee) => {
      const { category } = fee
      if (!acc[category]) acc[category] = []
      acc[category].push(fee)
      return acc
    },
    {} as Record<string, Fee[]>
  )
}

export const BranchSelectionModal: React.FC<BranchSelectionModalProps> = ({
  programId,
  isOpen,
  onClose,
  onRegisterSuccess,
  userRegistration,
}) => {
  const [branchPrograms, setBranchPrograms] = useState<BranchProgram[] | null>(
    null
  )
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [expandedFees, setExpandedFees] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const getBranchPrograms = async () => {
      if (!isOpen) return
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/program/${programId}/branches`
        )
        if (!response.ok) throw new Error('Gagal mengambil data cabang.')
        const data = (await response.json()).contents as BranchProgram[]
        setBranchPrograms(data)
      } catch (error) {
        toast.error('Gagal mengambil data cabang.')
      }
    }
    getBranchPrograms()
  }, [isOpen, programId])

  const toggleFees = (branchId: string) => {
    setExpandedFees((prev) =>
      prev.includes(branchId)
        ? prev.filter((id) => id !== branchId)
        : [...prev, branchId]
    )
  }

  const handleRegister = async () => {
    if (!selectedBranchId) return
    setLoading(true)
    try {
      const at = getCookie('AT')
      if (!at) {
        toast.error('Silakan login terlebih dahulu!')
        router.push('/login')
        return
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/program/${programId}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${at}`,
          },
          body: JSON.stringify({ branch_id: selectedBranchId }),
        }
      )

      const responseJson = await response.json()
      if (response.status !== 201)
        throw new Error(responseJson.message || 'Gagal mendaftar')

      toast.success('Pendaftaran berhasil!')
      onRegisterSuccess()
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan saat mendaftar')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const selectedBranch = branchPrograms?.find((b) => b.id === selectedBranchId)

  const getStatusBadge = (status: UserRegistration['status']) => {
    switch (status) {
      case 'PENDING':
        return (
          <Badge
            variant="default"
            className="bg-yellow-500 hover:bg-yellow-500/80"
          >
            Menunggu Pembayaran
          </Badge>
        )
      case 'ACCEPTED':
        return (
          <Badge
            variant="default"
            className="bg-green-500 hover:bg-green-500/80"
          >
            Diterima
          </Badge>
        )
      case 'DECLINED':
        return (
          <Badge variant="destructive" className="bg-red-500">
            Ditolak
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-brown">Pilih Cabang</h2>
          <p className="text-gray-500 text-sm mt-1">
            Pilih cabang, lihat biaya, dan daftar program
          </p>
        </div>

        {userRegistration && (
          <div className="p-4 bg-amber-50 border-b">
            <div className="flex items-start gap-3">
              <Info className="text-amber-600 mt-1 h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">
                  Info Pendaftaran
                </h3>
                <div className="text-sm text-amber-700 mt-1">
                  Anda terdaftar di cabang{' '}
                  <span className="font-bold">
                    {userRegistration.branch_program.branch.name}
                  </span>{' '}
                  dengan status {getStatusBadge(userRegistration.status)}.
                  Mendaftar kembali akan membuat pendaftaran baru.
                </div>
                <Button
                  variant="tertiary"
                  className="font-semibold mt-2"
                  asChild
                >
                  <Link href="/profile" target="__blank">
                    Lihat Riwayat Pendaftaran
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto p-6">
          <RadioGroup
            value={selectedBranchId || ''}
            onValueChange={setSelectedBranchId}
            className="space-y-4"
          >
            {branchPrograms ? (
              branchPrograms.map((branchProgram) => {
                const groupedFees = groupFeesByCategory(branchProgram.fees)
                const isExpanded = expandedFees.includes(branchProgram.id)
                const isSelected = selectedBranchId === branchProgram.branch.id
                const isAlreadyRegisteredInThisBranch =
                  userRegistration?.branch_program.branch.id ===
                  branchProgram.branch.id

                return (
                  <Card
                    key={branchProgram.id}
                    className={cn(
                      'transition-all',
                      isSelected && 'border-brown ring-1 ring-brown'
                    )}
                  >
                    <CardHeader className="pb-2 flex flex-row items-start space-x-4">
                      <RadioGroupItem
                        value={branchProgram.branch.id}
                        id={branchProgram.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={branchProgram.id}
                          className="font-medium text-brown cursor-pointer"
                        >
                          {branchProgram.branch.name}
                        </label>
                        {isAlreadyRegisteredInThisBranch && (
                          <Badge className="ml-2 bg-blue-100 hover:bg-blue-100/80 text-blue-800">
                            Terdaftar pada Cabang Ini
                          </Badge>
                        )}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/branch/${branchProgram.branch.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          Detail <ExternalLink size={14} />
                        </Link>
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-2 pl-12">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between text-gray-600"
                        onClick={() => toggleFees(branchProgram.id)}
                      >
                        <span>Lihat Biaya</span>
                        {isExpanded ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </Button>
                      {isExpanded && (
                        <div className="mt-2 border-t pt-3">
                          {Object.entries(groupedFees).length > 0 ? (
                            Object.entries(groupedFees).map(
                              ([category, feeArray]) => (
                                <div key={category} className="mb-3">
                                  <h4 className="font-semibold text-sm">
                                    {category}
                                  </h4>
                                  <ul className="pl-4 list-disc text-sm space-y-1 mt-1">
                                    {feeArray.map((fee, i) => (
                                      <li key={i}>
                                        {fee.tier && `${fee.tier}: `}
                                        <span className="font-medium">
                                          Rp{' '}
                                          {fee.amount.toLocaleString('id-ID')}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            )
                          ) : (
                            <p className="text-sm text-gray-500">
                              Tidak ada informasi biaya.
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <p>Memuat data cabang...</p>
            )}
          </RadioGroup>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm">
            {selectedBranch && (
              <p className="font-medium">
                Terpilih:{' '}
                <span className="text-brown">{selectedBranch.branch.name}</span>
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button
              onClick={handleRegister}
              disabled={!selectedBranchId || loading}
              className="bg-brown hover:bg-brown/90 text-white"
            >
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
