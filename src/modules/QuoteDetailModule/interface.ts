export interface QuoteDetailResponse {
  status: number
  message: string
  contents: QuoteDetail
}

export interface QuoteDetail {
  id: string
  title: string
  created_at: string
  updated_at: string
  cover_image: string
  description: string
  items: QuoteItem[]
}

export interface QuoteItem {
  id: string
  quote_text: string
  bg_image: string
  author: string
}

export interface Props {}
