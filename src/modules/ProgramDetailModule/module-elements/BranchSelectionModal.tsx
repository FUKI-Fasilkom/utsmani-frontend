'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import type { Branch, Fee } from '../interface'
import { cn } from '@/lib/utils'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface BranchSelectionModalProps {
  programId: string
  branches: Branch[]
  isOpen: boolean
  onClose: () => void
  onRegisterSuccess: () => void
}

/**
 * A helper to group fees by category
 */
const groupFeesByCategory = (fees: Fee[]): Record<string, Fee[]> => {
  return fees.reduce(
    (acc, fee) => {
      const { category } = fee
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(fee)
      return acc
    },
    {} as Record<string, Fee[]>
  )
}

export const BranchSelectionModal: React.FC<BranchSelectionModalProps> = ({
  programId,
  branches,
  isOpen,
  onClose,
  onRegisterSuccess,
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [expandedFees, setExpandedFees] = useState<string[]>([])

  const router = useRouter()

  const toggleFees = (branchId: string) => {
    setExpandedFees((prev) =>
      prev.includes(branchId)
        ? prev.filter((id) => id !== branchId)
        : [...prev, branchId]
    )
  }

  const handleRegister = async () => {
    if (!selectedBranchId) return

    try {
      setLoading(true)
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
      if (response.status !== 201) {
        throw new Error(responseJson.message || 'Failed to register')
      }

      toast.success('Registration successful!')
      onClose()
      onRegisterSuccess()
    } catch (err: any) {
      toast.error(err.message || 'Error registering')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const selectedBranch = branches.find(
    (b) => b.branch_program_id === selectedBranchId
  )

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-brown">Pilih Cabang</h2>
          <p className="text-gray-500 text-sm mt-1">
            Pilih cabang, lihat biaya, dan daftar program
          </p>
        </div>
        {/* <div className="px-6 py-3 bg-blue-50 border-b text-sm">
          <p>
            Setelah mendaftar, Anda akan dihubungi lebih lanjut oleh Admin kami.
            Mohon pastikan nomor kontak pada{' '}
            <Link
              href="/profile"
              className="text-blue-600 hover:underline font-medium"
            >
              profil
            </Link>{' '}
            dapat dihubungi.
          </p>
        </div> */}

        <div className="flex-1 overflow-auto p-6">
          <RadioGroup
            value={selectedBranchId || ''}
            onValueChange={setSelectedBranchId}
            className="space-y-4"
          >
            {branches.map((branchData) => {
              const groupedFees = groupFeesByCategory(branchData.fees)
              const isExpanded = expandedFees.includes(
                branchData.branch_program_id
              )
              const isSelected =
                selectedBranchId === branchData.branch_program_id

              return (
                <Card
                  key={branchData.branch_program_id}
                  className={cn(
                    'transition-all',
                    isSelected
                      ? 'border-brown ring-1 ring-brown'
                      : 'hover:border-gray-300'
                  )}
                >
                  <CardHeader className="pb-2 flex flex-row items-start">
                    <div className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem
                        value={branchData.branch.id}
                        id={branchData.branch_program_id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={branchData.branch_program_id}
                          className="text-lg font-medium text-brown cursor-pointer hover:underline"
                        >
                          {branchData.branch.title}
                        </label>
                        {isSelected && (
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      asChild
                    >
                      <Link
                        href={`/branch/${branchData.branch.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        Detail <ExternalLink size={14} />
                      </Link>
                    </Button>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-gray-600 hover:text-gray-900 p-2"
                      onClick={() => toggleFees(branchData.branch_program_id)}
                    >
                      <span>Lihat Biaya</span>
                      {isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>

                    {isExpanded && (
                      <div className="mt-2 border-t pt-3 pl-2">
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
                                      {fee.tier ? `${fee.tier}: ` : ''}
                                      <span className="font-medium">
                                        Rp {fee.amount.toLocaleString('id-ID')}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          )
                        ) : (
                          <div className="text-sm text-gray-500">
                            Tidak ada informasi biaya untuk cabang ini.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </RadioGroup>
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-lg flex justify-between items-center">
          <div className="text-sm">
            {selectedBranch && (
              <p className="font-medium">
                Selected:{' '}
                <span className="text-brown">
                  {selectedBranch.branch.title}
                </span>
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
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
