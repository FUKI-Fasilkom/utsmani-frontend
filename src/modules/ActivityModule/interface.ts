export interface ActivityItem {
  id: string
  title: string
  created_at: string
  updated_at: string
  type: string
  cover_image: string
  location: string | null
  activity_date: string | null
  dresscode: string | null
}

export interface Props {
  items?: ActivityItem[]
}
