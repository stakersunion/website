'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInWithMetamaskButton,
  SignOutButton,
} from '@clerk/nextjs'
import { useUser } from '@/utils/query/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import {
  faLoader,
  faUserCircle,
  faArrowRightFromBracket,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/regular'
import routes from '@/utils/routes'

const AccountMenu = () => {
  const { data: user, isLoading } = useUser()

  return (
    <>
      <ClerkLoading>
        <Avatar>
          <AvatarFallback>
            <FontAwesomeIcon
              icon={faLoader}
              className={'h-4 w-4 animate-spin'}
            />
          </AvatarFallback>
        </Avatar>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignInWithMetamaskButton>
            <Button>Sign In</Button>
          </SignInWithMetamaskButton>
        </SignedOut>
        <SignedIn>
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
              <SignOutButton>
                <DropdownMenuItem>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className={'w-4 h-4 mr-2 fa-fw'}
                  />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </ClerkLoaded>
    </>
  )
}

export default AccountMenu
