import { BranchDetailModule } from '@/modules'

export default async function BranchDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <BranchDetailModule id={id} />
}
