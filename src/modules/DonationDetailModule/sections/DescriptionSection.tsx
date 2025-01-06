'use client'
import React, { useState, useRef, useEffect } from 'react'

interface DescriptionSectionProps {
  description: string
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const descriptionRef = useRef<HTMLDivElement>(null)

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev)
  }

  useEffect(() => {
    const checkTruncation = () => {
      const el = descriptionRef.current
      if (el) {
        const { scrollHeight, clientHeight } = el
        setIsTruncated(scrollHeight > clientHeight + 1)
      }
    }

    checkTruncation()

    window.addEventListener('resize', checkTruncation)
    return () => {
      window.removeEventListener('resize', checkTruncation)
    }
  }, [description])

  return (
    <div>
      {/* Description Section */}
      <div className="flex flex-col">
        <div
          ref={descriptionRef}
          className={`text-sm md:text-base transition-all duration-300 ease-in-out ${
            !isExpanded ? 'truncate-description' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {/* Toggle Button */}
        {isTruncated && (
          <button
            onClick={toggleDescription}
            className="self-start focus:outline-none underline mt-2"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      {/* Custom Styles for Truncation */}
      <style jsx>{`
        .truncate-description {
          display: -webkit-box;
          -webkit-line-clamp: 20;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default DescriptionSection
