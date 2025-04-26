'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'
import type { Payment } from '../interface'
import type { Donation } from '@/modules/DonationModule/interface'
import { convertToRupiah } from '@/modules/DonationDetailModule/utils'
import {
  Receipt,
  CreditCard,
  User,
  ExternalLink,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const PaymentOverviewSection: React.FC<{ payment: Payment }> = ({
  payment,
}) => {
  const [donation, setDonation] = React.useState<Donation | null>(null)

  const fetchDonation = React.useCallback(async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donation/${id}`
      )
      const data = (await response.json()) as Donation
      setDonation(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  React.useEffect(() => {
    if (!payment || !payment.related_donor) return
    fetchDonation(payment.related_donor.donation.toString())
  }, [payment, fetchDonation])

  const getTotalAmount = (payment: Payment) => {
    return payment.net_amount + (payment.fee_amount || 0)
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'SUCCESSFUL':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Card className="overflow-hidden border-2 border-muted">
      <div className="bg-brown/10 p-4 border-b border-muted">
        <h3 className="font-bold text-xl text-brown flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Detail Transaksi
        </h3>
      </div>
      <CardContent className="p-0">
        <div className="p-4 space-y-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-muted-foreground">Invoice</span>
            </div>
            <span className="font-mono font-medium">
              {payment.invoice_number}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-muted-foreground">Status</span>
            </div>
            <Badge
              variant="outline"
              className={`${getStatusColor(payment.transaction_status)}`}
            >
              {payment.transaction_status === 'PENDING' ? (
                <Clock className="mr-1 h-3 w-3" />
              ) : payment.transaction_status === 'SUCCESSFUL' ? (
                <span className="mr-1">✓</span>
              ) : (
                <AlertCircle className="mr-1 h-3 w-3" />
              )}
              {payment.transaction_status}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Nama:</span>
            <span className="font-medium">{payment.related_donor.name}</span>
          </div>

          <Separator />

          <div className="rounded-lg bg-muted/50 p-3">
            <Link
              href={
                donation
                  ? `/sedekah-jariyah/${donation.id}.${donation.slug}`
                  : '#'
              }
              target="_blank"
              className="flex justify-between items-center group"
            >
              <span className="font-medium text-brown group-hover:underline flex items-center">
                {donation && donation.title}
                <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
              </span>
              <span className="font-medium">
                {convertToRupiah(payment.net_amount)}
              </span>
            </Link>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Biaya Layanan</span>
            <span>{convertToRupiah(payment.fee_amount || 0)}</span>
          </div>

          <Separator />

          <div className="flex justify-between items-center pt-2">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-xl text-brown">
              {convertToRupiah(getTotalAmount(payment))}
            </span>
          </div>

          {payment.payment_method && (
            <div className="flex items-center gap-2 mt-4 bg-muted/30 p-3 rounded-lg">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Metode Pembayaran:
              </span>
              <span className="text-sm font-medium">
                {payment.payment_method.name}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentOverviewSection
