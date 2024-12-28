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
  image_url: string
  donor_count: number
}
