'use client'

import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useUser as useClerk } from '@clerk/nextjs'
import { useProfile } from '@/utils/query/user/profile'
import { useVerification } from '@/utils/query/user/verification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const Setup = () => {
  const { isLoaded: clerkLoaded, isSignedIn } = useClerk()
  const { data: profile, isLoading: loadingProfile } = useProfile()
  const { data: verification, isLoading: loadingVerification } = useVerification()

  // Check if clerk is loading
  if (!clerkLoaded) {
    return <Skeleton className={'h-20'} />
  }
  // Proceed if clerk is loaded and the user is signed in
  else if (isSignedIn) {
    // Wait for user data to load
    if (loadingProfile || loadingVerification) {
      return <Skeleton className={'h-20'} />
    }
    // Show alert if user is signed in, user data is loaded and user has not completed setup
    else {
      // User has completed setup
      if (verification.independent.status === 'approved') return null

      // User has not yet created their profile
      if (!profile.name) {
        return (
          <Alert>
            <FontAwesomeIcon icon={faUserGear} />
            <div className={'flex flex-wrap items-center'}>
              <div className={'ml-1 mt-1 mr-6 flex-1'}>
                <AlertTitle>Get Started</AlertTitle>
                <AlertDescription>
                  Get started with the verification process to become a Stakers Union member.
                </AlertDescription>
              </div>
              <Link href={routes.apply.path}>
                <Button>Begin Setup</Button>
              </Link>
            </div>
          </Alert>
        )
      }

      // User has completed profile but has not yet submitted an address for eligbility
      if (!verification.eligibility.signature) {
        return (
          <Alert>
            <FontAwesomeIcon icon={faUserGear} />
            <div className={'flex flex-wrap items-center'}>
              <div className={'ml-1 mt-1 mr-6 flex-1'}>
                <AlertTitle>Complete Account Setup</AlertTitle>
                <AlertDescription>
                  Get started with the verification process to become a Stakers Union member.
                </AlertDescription>
              </div>
              <Link href={routes.apply.children.eligibility.path}>
                <Button>Begin Setup</Button>
              </Link>
            </div>
          </Alert>
        )
      }

      // User has submitted an address for eligibility and it is pending
      if (verification.eligibility.signature && verification.eligibility.status === 'pending') {
        return (
          <Alert>
            <FontAwesomeIcon icon={faUserGear} />
            <AlertTitle>Verfication Pending</AlertTitle>
            <AlertDescription>
              We're reviewing your submission, you'll get an email when your address has been
              approved.
            </AlertDescription>
          </Alert>
        )
      }

      // User has approved eligible address but not yet scheduled independent verification
      if (verification.eligibility.status === 'approved' && !verification.independent.schedule) {
        return (
          <Alert>
            <FontAwesomeIcon icon={faUserGear} />
            <div className={'flex flex-wrap items-center'}>
              <div className={'ml-1 mt-1 mr-6 flex-1'}>
                <AlertTitle>Complete Account Setup</AlertTitle>
                <AlertDescription>
                  Schedule a window for your proof independent operation to become a Stakers Union
                  member.
                </AlertDescription>
              </div>
              <Link href={routes.apply.children.independent.path}>
                <Button>Begin Setup</Button>
              </Link>
            </div>
          </Alert>
        )
      }

      // User has scheduled independent verification but it is pending
      if (verification.independent.schdedule && verification.independent.status === 'pending') {
        return (
          <Alert>
            <FontAwesomeIcon icon={faUserGear} />
            <AlertTitle>Verfication Pending</AlertTitle>
            <AlertDescription>
              We're reviewing your submission, you'll get an email when your address has been
              approved.
            </AlertDescription>
          </Alert>
        )
      }
    }
  }
}

export default Setup
