import { DonationDetailModule } from '@/modules'

export default async function DonationDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <DonationDetailModule id={(await params).id.split('.')[0]} />
}
