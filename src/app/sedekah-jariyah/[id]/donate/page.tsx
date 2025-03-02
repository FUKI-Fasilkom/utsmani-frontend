import { DonationCreateModule } from '@/modules'
import React from 'react'

const DonatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return <DonationCreateModule id={(await params).id.split('.')[0]} />
}

export default DonatePage
