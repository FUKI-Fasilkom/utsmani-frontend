import React from 'react'
import DOMPurify from 'isomorphic-dompurify'

interface AboutUsSectionProps {
  content: string
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content)

  return (
    <section className="container text-[#6C4534] mb-10">
      <h1 className="font-bold heading-1 text-center">Tentang Kami</h1>
      <div
        className="drop-shadow-lg rounded-[20px] bg-white py-10 px-9 paragraph text-center flex flex-col gap-y-4 mt-4"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
    </section>
  )
}
