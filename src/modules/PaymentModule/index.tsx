'use client'
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import PaymentOverviewSection from './sections/PaymentOverviewSection'
import PaymentMethodSection from './sections/PaymentMethodSection'
import PaymentSuccessSection from './sections/PaymentSuccessSection'
import type {
  Payment,
  PaymentCheckoutResponse,
  PaymentMethod,
} from './interface'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const PaymentModule = () => {
  const [payment, setPayment] = useState<Payment | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()

  const fetchPaymentDetail = useCallback(async (invoiceNumber: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/${invoiceNumber}/`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch payment detail')
      }
      const data = (await response.json()).contents
      setPayment(data as Payment)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const invoiceNumber = searchParams.get('invoice')
    if (!invoiceNumber) {
      setError('Invoice number is required')
      return
    }
    fetchPaymentDetail(invoiceNumber)
  }, [searchParams, fetchPaymentDetail])

  const onSelectPaymentMethod = (method: PaymentMethod) => {
    setPayment((prev) => {
      if (!prev) return prev
      return { ...prev, payment_method: method, fee_amount: method.total_fee }
    })
  }

  const handlePayment = async () => {
    if (!payment || !payment.payment_method) return

    setIsProcessing(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/checkout/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invoice_number: payment.invoice_number,
            payment_method_code: payment.payment_method.code,
            callback_url: `${window.location.origin}/payment?invoice=${payment.invoice_number}`,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Payment processing failed')
      }

      const data = (await response.json()) as PaymentCheckoutResponse
      window.location.href = data.contents.payment_url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment processing failed')
    } finally {
      setIsProcessing(false)
    }
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert variant="destructive" className="my-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error: {error}. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brown" />
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert variant="destructive" className="my-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No payment information found. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // If payment is successful, show only the success section
  if (payment.transaction_status === 'SUCCESSFUL') {
    return (
      <main className="w-full max-w-screen-xl p-8 mx-auto">
        <PaymentSuccessSection payment={payment} />
      </main>
    )
  }

  // Otherwise show the payment flow (pending or other statuses)
  return (
    <main className="w-full max-w-screen-xl p-8 mx-auto flex flex-col lg:flex-row-reverse gap-12">
      <div className="min-w-[300px] lg:w-[400px] lg:sticky lg:top-4 h-fit">
        <PaymentOverviewSection payment={payment} />
        <Button
          className="h-10 md:text-lg md:h-12 w-full mt-8"
          variant={'secondary'}
          disabled={payment.payment_method === null || isProcessing}
          onClick={handlePayment}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses Pembayaran...
            </>
          ) : (
            'Bayar'
          )}
        </Button>
      </div>
      <PaymentMethodSection
        payment={payment}
        onSelectMethod={onSelectPaymentMethod}
      />
    </main>
  )
}

export default PaymentModule
