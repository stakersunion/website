'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { SignIn } from '@/components/header'
import { ClerkLoading, ClerkLoaded, SignedIn, SignedOut } from '@clerk/nextjs'
import { Dropdown } from '@/components/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/regular'

const Account = () => {
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
          <SignIn />
        </SignedOut>
        <SignedIn>
          <Dropdown />
        </SignedIn>
      </ClerkLoaded>
    </>
  )
}

export default Account
