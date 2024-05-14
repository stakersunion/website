import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { faUser } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import {
  faUserCircle,
  faArrowRightFromBracket,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/regular'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUser } from '@/utils/query/user'
import { useQueryClient } from '@tanstack/react-query'
import { useClerk } from '@clerk/nextjs'
import routes from '@/utils/routes'

const Dropdown = () => {
  const { data: user } = useUser()
  const queryClient = useQueryClient()
  const { signOut } = useClerk()

  const handleSignout = () => {
    signOut()
    queryClient.removeQueries()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.profilePhoto} />
          <AvatarFallback>
            <FontAwesomeIcon
              icon={faUser}
              className={'w-4 h-4'}
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Welcome {user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={routes.account.path}>
          <DropdownMenuItem>
            <FontAwesomeIcon
              icon={faUserCircle}
              className={'w-4 h-4 mr-2 fa-fw'}
            />
            <span>Account</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleSignout}>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className={'w-4 h-4 mr-2 fa-fw'}
          />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown