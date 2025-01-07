import { NewsQuoteItem } from './interface'

export const filterAndSortItems = (
  items: NewsQuoteItem[],
  searchQuery?: string,
  types?: string[],
  sortOrder?: string
) => {
  let result = [...items]

  if (searchQuery) {
    result = result.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  if (types && types.length > 0) {
    result = result.filter((item) => types.includes(item.type.toLowerCase()))
  }

  result.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime()
    const dateB = new Date(b.updated_at).getTime()
    return sortOrder === 'terlama' ? dateA - dateB : dateB - dateA
  })

  return result
}
