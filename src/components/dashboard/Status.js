'use client'

import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useUser as useClerk } from '@clerk/nextjs'
import { useVerificationStatus } from '@/utils/query/user/verification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const Status = () => {
  const { isLoaded: clerkLoaded, isSignedIn } = useClerk()
  const { data: status, isLoading: loadingStatus } = useVerificationStatus()

  // Check if clerk is loading
  if (!clerkLoaded) {
    return <Skeleton className={'h-20'} />
  }
  // Proceed if clerk is loaded and the user is signed in
  else if (isSignedIn) {
    // Wait for user data to load
    if (loadingStatus) {
      return <Skeleton className={'h-20'} />
    }
    // Show alert if user is signed in, user data is loaded and user has not completed setup
    else if (status.current !== 'residential' && status.status !== 'complete') {
      return (
        <Alert>
          <FontAwesomeIcon icon={faUserGear} />
          <div className={'flex flex-wrap items-center'}>
            <div className={'ml-1 mt-1 mr-6 flex-1'}>
              <AlertTitle>Application Status</AlertTitle>
              <AlertDescription>
                Your Stakers Union application is in progress, track your status and complete any
                missing steps.
              </AlertDescription>
            </div>
            <Link href={routes.account.children.status.path}>
              <Button>Status</Button>
            </Link>
          </div>
        </Alert>
      )
    }
  }
}

export default Status
