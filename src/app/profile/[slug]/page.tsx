import { ProfileModule } from '@/modules'
import { ProfileTab } from '@/modules/ProfileModule/interface'
import { redirect } from 'next/navigation'

const slugToTabMap: Record<string, ProfileTab> = {
  'my-profile': ProfileTab.Profile,
  'my-certificates': ProfileTab.Certificates,
  'my-programs': ProfileTab.Registrations,
}

interface ProfileSlugPageProps {
  params: {
    slug: string
  }
}

export default async function ProfileSlugPage({
  params,
}: ProfileSlugPageProps) {
  const { slug } = await params
  const activeTab = slugToTabMap[slug]

  if (!activeTab) {
    redirect('/profile/my-profile')
  }

  return <ProfileModule defaultTab={activeTab} />
}
