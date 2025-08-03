import { User } from '@/components/context/AuthContext/interface'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'

// Helper to get initials from a name
const getInitials = (name: string = ''): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// A more robust Avatar component
const UserAvatar = ({ user }: { user: User }) => {
  const initials = getInitials(user.fullname)

  return (
    <div className="w-12 h-12 rounded-full bg-[#6C4534] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">
      {user.profile_picture ? (
        <Image
          src={user.profile_picture}
          alt={user.fullname}
          width={40}
          height={40}
          className="rounded-full object-cover aspect-square"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

const UserProfileDropdown = ({
  user,
  onLogout,
}: {
  user: User
  onLogout: () => void
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <span className="font-semibold text-sm text-[#6C4534] hidden lg:block">
          Hi, {user.fullname?.split(' ')[0]}
        </span>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <p className="font-bold truncate">{user.fullname}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>
            <Button variant="secondary" className="w-full">
              Lihat Profil
            </Button>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={onLogout}>
          <Button variant="danger" className="w-full">
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserProfileDropdown
