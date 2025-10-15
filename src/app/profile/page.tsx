import { redirect } from 'next/navigation'

/**
 * Redirects the base /profile route to the default my-profile tab.
 */
export default function ProfilePage() {
  redirect('/profile/my-profile')
}
