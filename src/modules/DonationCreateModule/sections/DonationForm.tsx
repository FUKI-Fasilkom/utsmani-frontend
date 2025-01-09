'use client'

import React, { useState, useEffect } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { DONATION_AMOUNT_SHORCUTS } from '../../DonationCreateModule/constants'
import { convertToRupiah } from '@/modules/DonationDetailModule/utils'
import { emailRegex, whatsappRegex } from '../utils/regex'

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num)
}

const unformatNumber = (str: string): number => {
  const cleaned = str.replace(/\./g, '')
  const parsed = parseInt(cleaned, 10)
  return isNaN(parsed) ? 0 : parsed
}

const donationSchema = z.object({
  donationAmount: z
    .number({
      required_error: 'Donation amount is required',
      invalid_type_error: 'Donation amount must be a number',
    })
    .min(0, 'Donation amount cannot be negative'),
  name: z.string().nonempty('Mohon isi nama Anda'),
  contact: z
    .string()
    .nonempty('Mohon isi nomor WhatsApp atau email Anda')
    .refine(
      (val) => {
        return emailRegex.test(val) || whatsappRegex.test(val)
      },
      {
        message: 'Nomor WhatsApp atau email tidak valid',
      }
    ),
  isAnonymous: z.boolean(),
})

type DonationFormValues = z.infer<typeof donationSchema>

export const DonationForm: React.FC = () => {
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donationAmount: 0,
      name: '',
      contact: '',
      isAnonymous: false,
    },
  })

  const { watch, setValue, trigger } = form

  const donationAmount = watch('donationAmount')

  const [formattedDonationAmount, setFormattedDonationAmount] =
    useState<string>('0')

  useEffect(() => {
    setFormattedDonationAmount(
      donationAmount > 0 ? formatNumber(donationAmount) : '0'
    )
  }, [donationAmount])

  const onSubmit = (data: DonationFormValues) => {
    console.log('Form Data:', data)
  }

  const handleShortcutClick = (amount: number) => {
    setValue('donationAmount', amount)
    trigger('donationAmount')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const unformatted = unformatNumber(input)
    setValue('donationAmount', unformatted)
    trigger('donationAmount')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Donation Amount Input */}
        <FormField
          name="donationAmount"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="flex items-center">
                  <span
                    className="absolute block pl-3.5 text-2xl md:text-3xl font-bold leading-none text-[#333333]"
                    id="donationInput-currency_symbol"
                    data-testid="donation-input-amount-currency-symbol"
                  >
                    Rp
                  </span>
                  <Input
                    {...field}
                    type="text"
                    className="h-[52px] w-full rounded border-none bg-[#F3F7F9] py-[7.5px] pl-[1.9em] pr-[15px] text-right text-2xl md:text-3xl font-bold focus:outline-none"
                    placeholder="0"
                    value={formattedDonationAmount}
                    onChange={handleInputChange}
                    onBlur={() => {
                      setValue(
                        'donationAmount',
                        unformatNumber(formattedDonationAmount)
                      )
                      trigger('donationAmount')
                    }}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        'Backspace',
                        'Tab',
                        'ArrowLeft',
                        'ArrowRight',
                        'Delete',
                      ]
                      if (
                        !/[0-9.]/.test(e.key) &&
                        !allowedKeys.includes(e.key)
                      ) {
                        e.preventDefault()
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Shortcut Buttons */}
        <div className="flex gap-4 flex-wrap">
          {DONATION_AMOUNT_SHORCUTS.map((amount) => (
            <Button
              key={amount}
              type="button"
              variant="tertiary"
              onClick={() => handleShortcutClick(amount)}
              className="px-4 py-2 text-sm"
            >
              {convertToRupiah(amount)}
            </Button>
          ))}
        </div>

        {/* Donor Information Group */}
        <div className="space-y-4">
          {/* Name Field */}
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Nama"
                    className="bg-[#F3F7F9]  border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Field */}
          <FormField
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Nomor WhatsApp atau Email"
                    className="bg-[#F3F7F9]  border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Anonymous Toggle */}
          <FormField
            name="isAnonymous"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-brown"
                  />
                </FormControl>
                <FormItem className="m-0 flex items-center">
                  <label
                    htmlFor="isAnonymous"
                    className="font-medium text-sm md:text-base align-middle"
                  >
                    Sembunyikan nama saya (anonim)
                  </label>
                </FormItem>
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          variant={'secondary'}
          disabled={donationAmount === 0}
        >
          Donate
        </Button>
      </form>
    </Form>
  )
}
