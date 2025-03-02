import { Donor } from '../DonationDetailModule/interface'

export interface Payment {
  invoice_number: string
  net_amount: number
  fee_amount: number | null
  payment_method: PaymentMethod | null
  transaction_status: string
  related_donor: Donor
}

export type PaymentMethod = {
  name: string
  code: string
  image_url: string
  category: string
  total_fee: number
}

export type PaymentCheckoutResponse = {
  status: string
  message: string
  contents: {
    invoice_number: string
    payment_url: string
  }
}
