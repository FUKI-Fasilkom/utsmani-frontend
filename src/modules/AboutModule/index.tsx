import React from 'react'
import {
  AboutUsSection,
  DetailSection,
  HeaderSection,
  StructureSection,
} from './sections'
import { AboutPageData } from './interface'

export const AboutModule: React.FC = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutpage/data/`)
  const data = (await res.json()) as AboutPageData

  return (
    <div className="flex flex-col gap-20">
      <HeaderSection imageUrl={data.banner} />
      <AboutUsSection content={data.description} />
      <DetailSection data={data} />
      <StructureSection imageUrl={data.organizationStructure} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutpage/data/`)
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}

export default AboutModule
