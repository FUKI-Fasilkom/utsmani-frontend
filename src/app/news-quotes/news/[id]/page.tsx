import { ActivityDetailModule } from '@/modules'

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <ActivityDetailModule id={id} type="NEWS" />
}
