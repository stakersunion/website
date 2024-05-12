'use client'

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
import { SignOutButton } from '@clerk/nextjs'
import { CircleUserRound, UserRound, LogOut } from 'lucide-react'
import { useUser } from '@/utils/query/user'
import { Loader2 } from 'lucide-react'

const Menu = () => {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return <Loader2 className={'h-4 w-4 animate-spin'} />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.profilePhoto} />
          <AvatarFallback>
            <CircleUserRound strokeWidth={1} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Welcome {user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={'/profile'}>
          <DropdownMenuItem>
            <UserRound
              strokeWidth={1}
              className={'w-4 h-4 mr-2'}
            />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <SignOutButton>
          <DropdownMenuItem>
            <LogOut
              strokeWidth={1}
              className={'w-4 h-4 mr-2'}
            />
            <span>Log Out</span>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
