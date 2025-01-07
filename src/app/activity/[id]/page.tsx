import { ActivityDetailModule } from '@/modules'

export default async function ActivityDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <ActivityDetailModule id={id} />
}
