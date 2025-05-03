import React from 'react'
import { ActivityItem } from '../interface'
import Image from 'next/image'
import { CalendarDays, Shirt, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ActivityCardProps {
  item: ActivityItem
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ item }) => {
  return (
    <div
      key={item.id}
      className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 shadow-md"
    >
      <h3 className=" self-center font-semibold text-brown heading-5 text line-clamp-3">
        {item.title}
      </h3>
      <Image
        src={item.cover_image}
        alt={item.title}
        width={400}
        height={400}
        className="w-full h-[200px] object-cover rounded-lg"
      />
      <div className="flex justify-center flex-col gap-2 text-black">
        {item.activity_date && (
          <div className="flex gap-2">
            <div>
              <CalendarDays className="mr-2 text-brown" strokeWidth={3} />
            </div>
            {item.activity_date}
          </div>
        )}
        {item.dresscode && (
          <div className="flex gap-2">
            <div>
              <Shirt className="mr-2 text-brown fill-brown" fill="true" />
            </div>
            {item.dresscode}
          </div>
        )}
        {item.location && (
          <div className="flex gap-2">
            <div>
              <MapPin className="mr-2  text-brown" strokeWidth={3} />
            </div>
            {item.location}
          </div>
        )}
      </div>
      <div className="h-2 md:h-4"></div>
      <Button
        variant="secondary"
        className="self-center text-white1 text-base px-[36px] py-[18px] mt-auto"
        asChild
      >
        <Link href={`/${item.type.toLocaleLowerCase()}/${item.id}`}>
          Selengkapnya
        </Link>
      </Button>
    </div>
  )
}
