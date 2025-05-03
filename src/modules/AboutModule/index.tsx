import React from 'react'
import {
  AboutUsSection,
  DetailSection,
  HeaderSection,
  StructureSection,
} from './sections'

export const AboutModule: React.FC = async () => {
  return (
    <div className="flex flex-col gap-20">
      <HeaderSection />
      <AboutUsSection />
      <DetailSection />
      <StructureSection />
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
