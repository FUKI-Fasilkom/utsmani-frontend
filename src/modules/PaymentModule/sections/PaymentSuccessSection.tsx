'use client'

import React from 'react'
import type { Payment } from '../interface'
import type { Donation } from '@/modules/DonationModule/interface'
import { convertToRupiah } from '@/modules/DonationDetailModule/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  CheckCircle2,
  Receipt,
  User,
  Calendar,
  ExternalLink,
  Home,
} from 'lucide-react'

const PaymentSuccessSection: React.FC<{ payment: Payment }> = ({ payment }) => {
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center text-center mb-8 py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
          Pembayaran Berhasil
        </h1>
        <p className="text-muted-foreground max-w-md">
          Terima kasih atas donasi Anda. Semoga kebaikan ini menjadi amal
          jariyah yang berkah.
        </p>
      </div>

      <Card className="overflow-hidden border-2 border-muted shadow-md">
        <div className="bg-brown/10 p-4 border-b border-muted">
          <h3 className="font-bold text-xl text-brown flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Detail Transaksi
          </h3>
        </div>
        <CardContent className="p-0">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">No. Invoice</p>
                <p className="font-mono font-medium">
                  {payment.invoice_number}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tanggal</p>
                <p className="font-medium flex items-center">
                  <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                  {formatDate(new Date().toISOString())}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Nama</p>
              <p className="font-medium flex items-center">
                <User className="mr-1 h-4 w-4 text-muted-foreground" />
                {payment.related_donor.name}
              </p>
            </div>

            <Separator />

            <div className="rounded-lg bg-muted/50 p-4">
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

            <Separator />

            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-xl text-brown">
                {convertToRupiah(getTotalAmount(payment))}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8 gap-4">
        <Button variant="secondary" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default PaymentSuccessSection
