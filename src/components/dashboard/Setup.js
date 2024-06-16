'use client'

import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useUser as useClerk } from '@clerk/nextjs'
import { useUser } from '@/utils/query/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const Setup = () => {
  const { isLoaded: clerkLoaded, isSignedIn } = useClerk()
  const { data: user, isLoading: loadingUser } = useUser()

  // Check if clerk is loading
  if (!clerkLoaded) {
    return <Skeleton className={'h-20'} />
  }
  // Proceed if clerk is loaded and the user is signed in
  else if (isSignedIn) {
    // Wait for user data to load
    if (loadingUser) {
      return <Skeleton className={'h-20'} />
    }
    // Show alert if user is signed in, user data is loaded and user has not completed setup
    else if (!user?.name) {
      return (
        <Alert>
          <FontAwesomeIcon icon={faUserGear} />
          <div className={'flex flex-1 ml-2'}>
            <div className={'flex-1 flex-col'}>
              <AlertTitle>Complete Account Setup</AlertTitle>
              <AlertDescription>
                Get started with the verification process to become a Stakers Union member.
              </AlertDescription>
            </div>
            <Link href={routes.account.children.profile.path}>
              <Button>Begin Setup</Button>
            </Link>
          </div>
        </Alert>
      )
    }
  }
}

export default Setup
