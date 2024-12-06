import { ProgramDetailModule } from '@/modules'

export default async function ProgramDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <ProgramDetailModule id={id} />
}
