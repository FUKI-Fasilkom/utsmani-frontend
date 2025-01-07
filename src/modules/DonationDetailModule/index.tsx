import React from 'react'
import { HeroSection } from '../DonationModule/sections'
import {
  ContactPersonSection,
  DescriptionSection,
  SideSection,
  DonationCarouselSection,
  DonorSection,
} from './sections'
import { Donation } from '../DonationModule/interface'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export const DonationDetailModule: React.FC<{ id: string }> = async ({
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
    <Dialog>
      <HeroSection banner={donation.banner.image_url} />
      <main className="container py-10 flex flex-col lg:flex-row">
        <SideSection donation={donation} />
        <section className="flex flex-col px-2 lg:px-[72px] gap-y-9 mt-10">
          <DescriptionSection description={donation.description} />
          {donation.images && (
            <DonationCarouselSection images={donation.images} />
          )}
          <DonorSection id={id} />
          <ContactPersonSection
            name={donation.cp_name}
            detail={donation.cp_detail}
            wa_number={donation.cp_wa_number}
            email={donation.cp_email}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Donasi Sekarang</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </section>
      </main>
    </Dialog>
  )
}
