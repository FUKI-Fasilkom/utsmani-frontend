import Link from 'next/link'
import { Donation, DonationCategory } from '../interface'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import {
  convertToRupiah,
  getDuration,
} from '@/modules/DonationDetailModule/utils'

interface DonationCardProps {
  donation: Donation
}

export const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  const percentageAmount =
    (donation.current_amount / donation.target_amount) * 100

  return (
    <Link
      href={`/sedekah-jariyah/${donation.id}`}
      className="block bg-white rounded-2xl p-3 drop-shadow-lg"
    >
      <Image
        src={donation.banner.image_url}
        height={400}
        width={400}
        alt={donation.title}
        className="aspect-video object-cover rounded-xl"
      />
      <div className="flex flex-col md:gap-y-1 mt-2">
        <span className="text-brown/80 font-semibold text-[10px] md:text-xs lg:text-base">
          {
            DonationCategory[
              donation.category.toUpperCase() as keyof typeof DonationCategory
            ]
          }
        </span>
        <div className="min-h-[2.25rem] md:min-h-[2.625rem] lg:min-h-[3.375rem] flex items-center overflow-hidden">
          <span
            className="text-brown font-semibold text-xs md:text-sm lg:text-lg line-clamp-2 w-full"
            title={donation.title} // Optional: Displays full title on hover
          >
            {donation.title}
          </span>
        </div>

        <div className="text-[10px] md:text-xs lg:text-sm text-brown mt-2 flex flex-col gap-y-1">
          <div className="flex justify-between">
            <span>
              <span className="font-bold">{donation.donor_count}</span> Donatur
            </span>
            <span>
              <span className="font-bold">
                {getDuration(donation.deadline, 'hari', true, false)}
              </span>{' '}
              sisa hari
            </span>
          </div>
          <Progress value={percentageAmount} className="h-2" />
          <div className="flex justify-between items-center h-[1.5rem] md:h-[2rem] lg:h-[2.5rem]">
            <span className="flex-1">
              Terkumpul <br />
              <span className="font-bold">
                {convertToRupiah(donation.current_amount)}
              </span>
            </span>
            <span className="font-bold flex-1 text-end">
              {percentageAmount.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
