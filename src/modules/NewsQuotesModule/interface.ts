export interface NewsQuoteItem {
  id: string
  title: string
  image: string
  type: 'berita' | 'quote'
  date: string
  content: string
}

export interface Props {
  items?: NewsQuoteItem[]
}
