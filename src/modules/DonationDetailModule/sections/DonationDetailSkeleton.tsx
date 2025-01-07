// @modules/DonationDetailModule/DonationDetailSkeleton.tsx

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton' // Adjust the import path as needed

const DonationDetailSkeleton: React.FC = () => {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="flex justify-between w-full h-[160px] lg:h-[400px] bg-gray-200">
        {/* Banner Image Skeleton */}
        <Skeleton className="w-1/2 h-full" />

        {/* Title Skeleton */}
        <div className="w-1/2 flex justify-center items-center">
          <Skeleton className="w-48 h-12" />
        </div>
      </section>

      {/* Main Content Skeleton */}
      <main className="container py-10 flex space-x-8">
        {/* Side Section Skeleton */}
        <aside className="w-5/12 h-full">
          <Skeleton className="w-3/4 h-6 mb-4" />
          <Skeleton className="w-1/2 h-8 mb-6" />
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-3/4 h-4" />
        </aside>

        {/* Main Section Skeleton */}
        <section className="flex flex-col px-[72px] gap-y-6 w-full">
          {/* Description Section Skeleton */}
          <div className="space-y-4">
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
          </div>

          {/* Donation Carousel Section Skeleton */}
          <Skeleton className="w-full h-48 rounded" />

          {/* Donor Section Skeleton */}
          <div className="space-y-4">
            <Skeleton className="w-1/4 h-6" />
            {/* Repeat for a few donor items */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-3/4 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Contact Person Section Skeleton */}
          <div className="space-y-4">
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-2/3 h-4" />
            <div className="flex space-x-4">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-1/2 h-4" />
            </div>
            <div className="flex space-x-4">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default DonationDetailSkeleton
