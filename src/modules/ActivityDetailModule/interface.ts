import { ImageData } from '@/lib/image/interface'

export type ActivityDetail = {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
  cover_image: string
  location: string | null
  activity_date: string | null
  images: ImageData[]
  posted_by: string | null
}

export type ActivityDetailModuleProps = {
  id: string
  type: 'ACTIVITY' | 'NEWS'
}
