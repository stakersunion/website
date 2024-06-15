'use client'

import { useEffect, useState } from 'react'
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
  faLoader,
  faUserCircle,
  faLock,
  faArrowRightFromBracket,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/regular'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUser } from '@/utils/query/user'
import { useQueryClient } from '@tanstack/react-query'
import { useClerk } from '@clerk/nextjs'
import useRole from '@/utils/roles'
import { routes } from '@/utils/routes'
import { mainnet } from '@/utils/chains'

const Dropdown = () => {
  const { data: user, isLoading } = useUser()
  const [ensName, setEnsName] = useState('')
  const queryClient = useQueryClient()
  const { signOut } = useClerk()
  const role = useRole()

  const handleSignout = () => {
    signOut()
    queryClient.removeQueries()
  }

  useEffect(() => {
    if (!user) return
    const fetchEnsName = async () => {
      const ensName = await mainnet.getEnsName({
        address: user.address,
      })
      setEnsName(ensName)
    }
    fetchEnsName()
  }, [user])

  if (isLoading) {
    return (
      <Avatar>
        <AvatarFallback>
          <FontAwesomeIcon
            icon={faLoader}
            className={'h-4 w-4 animate-spin'}
          />
        </AvatarFallback>
      </Avatar>
    )
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
        <DropdownMenuLabel>Welcome {ensName || user?.name}</DropdownMenuLabel>
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
        {role === 'admin' && (
          <Link href={routes.admin.path}>
            <DropdownMenuItem>
              <FontAwesomeIcon
                icon={faLock}
                className={'w-4 h-4 mr-2 fa-fw'}
              />
              <span>Admin</span>
            </DropdownMenuItem>
          </Link>
        )}
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
