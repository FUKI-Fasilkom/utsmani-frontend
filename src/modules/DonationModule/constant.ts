import { Donation } from './interface'
import {
  CategoryInfaqIcon,
  CategoryOrtuAsuhIcon,
  CategoryUtsmaniPeduliIcon,
  CategoryWakafIcon,
} from './module-elements'

export const CATEGORY_MENU = [
  {
    title: 'Infaq/Sedekah',
    icon: CategoryInfaqIcon,
    path: '/donation?category=infaq',
  },
  {
    title: 'Wakaf',
    icon: CategoryWakafIcon,
    path: '/donation?category=wakaf',
  },
  {
    title: 'Orangtua Asuh',
    icon: CategoryOrtuAsuhIcon,
    path: '/donation?category=ortu-asuh',
  },
  {
    title: 'Utsmani Peduli',
    icon: CategoryUtsmaniPeduliIcon,
    path: '/donation?category=utsmani-peduli',
  },
]

export const DUMMY_DONATION_LIST: Donation[] = [
  {
    id: '1',
    created_at: '2021-09-01T00:00:00.000',
    updated_at: '2021-09-01T00:00:00.000',
    title: 'Wakaf Masjid',
    category: 'Wakaf',
    target_amount: 100000000,
    current_amount: 50000000,
    deadline: '2021-12-01T00:00:00.000',
    description:
      'Wakaf untuk membangun masjid Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image_url: '/assets/images/wakaf-thumbnail.png',
    donor_count: 10,
  },
  {
    id: '2',
    created_at: '2021-09-01T00:00:00.000',
    updated_at: '2021-09-01T00:00:00.000',
    title: 'Wakaf Masjid',
    category: 'Wakaf',
    target_amount: 100000000,
    current_amount: 50000000,
    deadline: '2021-12-01T00:00:00.000',
    description: 'Wakaf untuk membangun masjid',
    image_url: '/assets/images/wakaf-thumbnail.png',
    donor_count: 10,
  },
  {
    id: '3',
    created_at: '2021-09-01T00:00:00.000',
    updated_at: '2021-09-01T00:00:00.000',
    title: 'Wakaf Masjid',
    category: 'Wakaf',
    target_amount: 100000000,
    current_amount: 50000000,
    deadline: '2021-12-01T00:00:00.000',
    description: 'Wakaf untuk membangun masjid',
    image_url: '/assets/images/wakaf-thumbnail.png',
    donor_count: 10,
  },
  {
    id: '4',
    created_at: '2021-09-01T00:00:00.000',
    updated_at: '2021-09-01T00:00:00.000',
    title: 'Wakaf Masjid',
    category: 'Wakaf',
    target_amount: 100000000,
    current_amount: 50000000,
    deadline: '2021-12-01T00:00:00.000',
    description: 'Wakaf untuk membangun masjid',
    image_url: '/assets/images/wakaf-thumbnail.png',
    donor_count: 10,
  },
]
