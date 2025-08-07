import { ImageData } from '@/lib/image/interface'

export type BranchDetail = {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
  cover_image: string
  address: string | null
  map_address_link: string | null
  images: ImageData[]
}
