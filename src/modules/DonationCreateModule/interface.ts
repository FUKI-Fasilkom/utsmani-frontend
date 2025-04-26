import { Donor } from '../DonationDetailModule/interface'

export type DonateResponse = {
  message: string
  donor: Donor
  payment: Payment
}

type Payment = {
  invoice_number: string
  net_amount: number
  transaction_status: string
}
