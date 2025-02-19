'use client'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

type PaymentMethod = {
  name: string
  code: string
  image_url: string
  category: string
  total_fee: number
}

const PaymentMethodModule = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch payment methods from the API
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/payment-methods/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ net_amount: null }),
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch payment methods')
        }

        const data = await response.json()
        setPaymentMethods(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPaymentMethods()
  }, [])

  // Group payment methods by category
  const groupedMethods = paymentMethods.reduce(
    (acc, method) => {
      const category = method.category
      if (!acc[category]) acc[category] = []
      acc[category].push(method)
      return acc
    },
    {} as Record<string, PaymentMethod[]>
  )

  // Define category order for consistent display
  const categoryOrder = [
    'Bank Transfer',
    'e-Wallet',
    'Convenient Store',
    'Cards',
    'QRIS',
    'Digital Banking',
    'PayLater',
    'Internet Banking',
    'Direct Debit',
  ]

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="text-red-500 text-center py-6">
          Error: {error}. Please try again later.
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h4 className="text-lg font-semibold mb-6">Choose Payment Method</h4>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h4 className="text-lg font-semibold mb-6">Choose Payment Method</h4>

      <Accordion type="single" collapsible className="w-full">
        {categoryOrder.map((category) => {
          const methods = groupedMethods[category]
          if (!methods) return null

          return (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-medium text-gray-700">{category}</span>
                  <div className="flex items-center space-x-2">
                    {methods.slice(0, 5).map((method) => (
                      <Image
                        key={method.code}
                        src={method.image_url}
                        alt={method.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain border rounded-md p-1 bg-white"
                      />
                    ))}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="space-y-2">
                  {methods.map((method) => (
                    <div
                      key={method.code}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer border"
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          src={method.image_url}
                          alt={method.name}
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {method.name}
                        </span>
                      </div>
                      {method.total_fee && (
                        <span className="text-sm text-gray-500">
                          Fee: Rp{method.total_fee.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default PaymentMethodModule
