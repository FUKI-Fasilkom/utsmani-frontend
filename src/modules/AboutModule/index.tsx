import React from 'react'
import {
  AboutUsSection,
  DetailSection,
  HeaderSection,
  StructureSection,
} from './sections'
import { AboutPageData } from './interface'

async function getAboutPageData(): Promise<AboutPageData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/aboutpage/data/`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch about page data: ${res.status}`)
    }

    return (await res.json()) as AboutPageData
  } catch (error) {
    console.error('Error fetching about page data:', error)
    return null
  }
}

export const AboutModule: React.FC = async () => {
  const data = await getAboutPageData()

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Data tidak tersedia</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-20">
      <HeaderSection imageUrl={data.banner} />
      <AboutUsSection content={data.description} />
      <DetailSection data={data} />
      <StructureSection imageUrl={data.organizationStructure} />
    </div>
  )
}
