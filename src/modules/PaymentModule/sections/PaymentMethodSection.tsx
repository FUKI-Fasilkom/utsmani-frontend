'use client'
import { useEffect, useState } from 'react'
import type React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import type { Payment, PaymentMethod } from '../interface'
import { Check } from 'lucide-react'

const PaymentMethodSection: React.FC<{
  payment: Payment
  onSelectMethod?: (method: PaymentMethod) => void
}> = ({ payment, onSelectMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  )
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/payment-methods/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ net_amount: payment.net_amount }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch payment methods')
      }

      const data = (await response.json()).contents
      setPaymentMethods(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
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

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method)
    if (onSelectMethod) {
      onSelectMethod(method)
    }
  }

  return (
    <section className="w-full lg:w-8/12">
      <h4 className="text-lg font-semibold mb-2">Choose Payment Method</h4>
      <Accordion type="single" collapsible={true} className="w-full">
        {Object.entries(groupedMethods).map(([category, methods]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="font-medium text-gray-700">{category}</span>
                <div className="flex items-center space-x-2">
                  {methods.slice(0, 5).map((method) => (
                    <Image
                      key={method.code}
                      src={method.image_url || '/placeholder.svg'}
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
                {methods.map((method) => {
                  const isSelected = selectedMethod?.code === method.code

                  return (
                    <div key={method.code} className="flex flex-col">
                      <div
                        onClick={() => handleMethodSelect(method)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors
                          ${isSelected ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50 border-gray-200'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <Image
                            src={method.image_url || '/placeholder.svg'}
                            alt={method.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {method.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          {method.total_fee && (
                            <span className="text-sm text-gray-500">
                              Fee: Rp
                              {method.total_fee.toLocaleString('id-ID')}
                            </span>
                          )}
                          {isSelected && (
                            <Check className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>

                      {/* Additional information when selected */}
                      {isSelected && (
                        <div className="p-3 border border-t-0 rounded-b-lg bg-green-50 border-green-200">
                          <p className="text-sm text-gray-700">
                            Bayar dengan {method.name}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default PaymentMethodSection
