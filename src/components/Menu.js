'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUserRound } from 'lucide-react'
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
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
