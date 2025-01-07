export interface ImageType {
  id: number
  image_url: string
}

export interface Donation {
  id: string
  created_at: string
  updated_at: string
  title: string
  category: DonationCategory
  target_amount: number
  current_amount: number
  deadline: string
  description: string
  banner: ImageType
  images?: ImageType[]
  donor_count: number
  cp_name: string
  cp_detail: string
  cp_wa_number: string | null
  cp_email: string | null
}

export enum DonationCategory {
  WAKAF = 'Wakaf',
  INFAQ_SEDEKAH = 'Infaq/Sedekah',
  ORANGTUA_ASUH = 'Orangtua Asuh',
  UTSMANI_PEDULI = 'Utsmani Peduli',
}
