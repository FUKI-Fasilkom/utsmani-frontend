interface Image {
  id: number
  url: string
}

export interface Donation {
  id: string
  created_at: string
  updated_at: string
  title: string
  category: string
  target_amount: number
  current_amount: number
  deadline: string
  description: string
  banner: Image
  images?: Image[]
  donor_count: number
  cp_name: string
  cp_detail: string
  cp_wa_number: string | null
  cp_email: string | null
}
