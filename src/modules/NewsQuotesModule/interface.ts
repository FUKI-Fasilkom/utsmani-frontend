export interface NewsQuoteItem {
  id: string
  title: string
  cover_image: string
  type: 'NEWS' | 'QUOTE'
  updated_at: string
  created_at: string
  content: string
}

export interface Props {
  items?: NewsQuoteItem[]
}
