import React from 'react'
import { DonationForm } from './sections'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Donation } from '../DonationModule/interface'

export const DonationCreateModule: React.FC<{ id: string }> = async ({
  id,
}) => {
  const fetchDonationById = async (id: string): Promise<Donation | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donation/${id}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = (await response.json()) as Donation
      return data
    } catch (error) {
      console.log(error)
    }
    return null
  }

  const donation: Donation | null = await fetchDonationById(id)

  if (!donation) {
    return <div>Donation not found</div>
  }
  return (
    <main className="w-screen min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-96px)] flex justify-center items-center py-8">
      <Card className="container max-w-screen-sm">
        <CardHeader className="gap-4">
          <Image
            src={donation.banner.image_url}
            alt="banner"
            width={400}
            height={400}
            className="w-full aspect-video object-cover"
          />
          <CardTitle>{donation.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <DonationForm />
        </CardContent>
      </Card>
    </main>
  )
}
