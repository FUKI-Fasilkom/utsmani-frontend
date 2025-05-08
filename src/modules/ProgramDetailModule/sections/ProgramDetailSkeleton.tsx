'use client'
import type React from 'react'

export const ProgramDetailSkeleton: React.FC = () => {
  return (
    <main className="flex flex-col">
      {/* Hero section skeleton */}
      <section className="flex flex-col lg:flex-row w-full lg:h-[536px] bg-[#F8EAD9] justify-left items-center">
        {/* Image placeholder */}
        <div className="w-full max-h-72 lg:max-h-none lg:max-w-[55%] h-full relative overflow-hidden flex items-center">
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        </div>

        {/* Content placeholder */}
        <div className="lg:w-[45%] flex flex-col gap-2 py-10 lg:py-4 lg:gap-6 px-2 lg:pr-12">
          {/* Title placeholder */}
          <div className="h-6 lg:h-8 w-3/4 bg-gray-300 rounded-md animate-pulse mx-auto lg:mx-0" />

          {/* Headline placeholder */}
          <div className="h-8 lg:h-10 w-full bg-gray-300 rounded-md animate-pulse mx-auto lg:mx-0 mt-2" />

          {/* Button placeholder */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 mt-4">
            <div className="h-12 w-64 bg-gray-300 rounded-md animate-pulse" />
          </div>
        </div>
      </section>

      {/* Content section skeleton */}
      <section className="flex flex-col lg:flex-row p-4 md:p-14 xl:p-28 gap-10 lg:gap-20 justify-center">
        {/* Description placeholder */}
        <div className="flex flex-col lg:w-1/2 gap-8 lg:max-w-[606px]">
          {/* Multiple paragraph placeholders */}
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={`desc-${index}`}
                className={`h-4 bg-gray-200 rounded-md animate-pulse ${index % 3 === 0 ? 'w-full' : index % 3 === 1 ? 'w-5/6' : 'w-4/6'}`}
              />
            ))}

          {/* Custom button placeholder */}
          <div className="h-12 w-48 bg-gray-300 rounded-md animate-pulse mt-4" />
        </div>

        {/* Jenjang section placeholder */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          {/* Title placeholder */}
          <div className="h-6 w-48 bg-gray-300 rounded-md animate-pulse" />

          {/* Level cards placeholders */}
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={`level-${index}`}
                className="h-32 w-full bg-gray-200 rounded-lg animate-pulse mt-2"
              />
            ))}
        </div>
      </section>

      {/* Other Programs section skeleton */}
      <section className="p-4 md:p-14 xl:p-28">
        {/* Section title placeholder */}
        <div className="h-8 w-64 bg-gray-300 rounded-md animate-pulse mx-auto mb-10" />

        {/* Program cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={`program-${index}`}
                className="h-64 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
        </div>
      </section>
    </main>
  )
}
