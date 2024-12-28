import { QuoteDetailModule } from '@/modules'

export default async function QuoteDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <QuoteDetailModule id={id} />
}
