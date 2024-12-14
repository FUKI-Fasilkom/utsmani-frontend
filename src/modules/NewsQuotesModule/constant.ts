import { NewsQuoteItem } from './interface'

export const DUMMY_ITEMS: NewsQuoteItem[] = [
  {
    id: '1',
    title: 'Pembukaan Tahun Ajaran Baru',
    image: 'https://picsum.photos/400/400?random=1',
    type: 'berita',
    date: '2024-03-15',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: '2',
    title: 'Quote of the Day',
    image: 'https://picsum.photos/400/400?random=2',
    type: 'quote',
    date: '2024-03-14',
    content:
      'Barangsiapa yang menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan ke surga.',
  },
  // Add more items as needed
]
