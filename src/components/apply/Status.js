'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, redirect } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserGear,
  faSignature,
  faSignatureSlash,
  faServer,
  faHouse,
  faHouseCircleCheck,
  faHouseCircleXmark,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useVerification, useVerificationStatus } from '@/utils/query/user/verification'
import { routes } from '@/utils/routes'

const Status = ({ setReplace }) => {
  const pathname = usePathname()
  const currentStep = Object.keys(routes.apply.children).find((key) =>
    pathname.startsWith(routes.apply.children[key].path)
  )
  const { data: status, isLoading: loadingStatus, isRefetching } = useVerificationStatus()
  const { data: verification, isLoading: loadingVerification } = useVerification()
  const [overrideStatus, setOverrideStatus] = useState()

  // Manage visibility of parent content
  useEffect(
    function hideParentContent() {
      if (loadingStatus) return
      // If current page matches current step and status is pending, don't show content
      if (
        (currentStep === status.current && status.status === 'pending') ||
        (currentStep === status.current && status.status === 'approved')
      ) {
        setReplace(true)
      }
      // For 'residential' step, should show content if current step is 'independent' and status is 'pending'
      else if (
        currentStep === 'residential' &&
        status.current === 'independent' &&
        status.status === 'pending'
      ) {
        setReplace(false)
      }
      // For 'independent' step, should hide content if current step is 'residential' and status is 'pending'
      else if (
        currentStep === 'independent' &&
        status.current === 'residential' &&
        status.status === 'pending'
      ) {
        if (loadingVerification) return
        setOverrideStatus({ current: 'independent', status: verification.independent.status })
        setReplace(true)
      } else {
        setReplace(false)
      }
    },
    [loadingStatus, isRefetching, setReplace]
  )

  const content = {
    eligibility: {
      incomplete: {
        icon: faSignature,
        title: 'Proof of Eligibility Incomplete',
        description: 'Submit a signed message to verify your eligibility.',
        link: routes.apply.children.eligibility.path,
      },
      pending: {
        icon: faSignature,
        title: 'Proof of Eligibility Pending',
        description:
          'You have submitted an address that is pending approval. You will be notified by email when your address has been approved and you can proceed to the verification step.',
      },
      approved: {
        icon: faSignature,
        title: 'Proof of Eligibility Approved',
        description:
          'Your signature has been approved, proceed to the next step for Proof of Independent Operation.',
        link: routes.apply.children.independent.path,
      },
      rejected: {
        icon: faSignatureSlash,
        title: 'Proof of Eligibility Rejected',
        description:
          'Your signature has been rejected. Please review the information you have submitted and try again.',
      },
    },
    independent: {
      incomplete: {
        icon: faServer,
        title: 'Proof of Independent Operation Incomplete',
        description: 'Submit a signed message to verify your independent operation.',
        link: routes.apply.children.independent.path,
      },
      pending: {
        icon: faServer,
        title: 'Proof of Independent Operation Pending',
        description:
          'You have submitted an address that is pending approval. You will be notified by email when your address has been approved. You may continue to Proof of Residential Operation.',
        link: routes.apply.children.residential.path,
      },
      approved: {
        icon: faServer,
        title: 'Proof of Independent Operation Approved',
        description:
          'Your missed attestations have been verified, proceed to the next step for Proof of Residential Operation.',
        link: routes.apply.children.residential.path,
      },
      rejected: {
        icon: faServer,
        title: 'Proof of Independent Operation Rejected',
        description:
          'Your signature has been rejected. Please review the information you have submitted and try again.',
      },
    },
    residential: {
      incomplete: {
        icon: faHouse,
        title: 'Proof of Residential Operation Incomplete',
        description: 'Submit a photo of your node to verify residential operation.',
        link: routes.apply.children.residential.path,
      },
      pending: {
        icon: faHouse,
        title: 'Proof of Residential Operation Pending',
        description:
          'You have submitted a photo that is pending approval. You will be notified by email when your photo has been approved.',
      },
      approved: {
        icon: faHouseCircleCheck,
        title: 'Proof of Residential Operation Approved',
        description: 'Your photo has been approved. You have completed the verification process.',
      },
      rejected: {
        icon: faHouseCircleXmark,
        title: 'Proof of Residential Operation Rejected',
        description:
          'Your photo has been rejected. Please review the information you have submitted and try again.',
        link: routes.apply.children.residential.path,
      },
    },
  }

  const getContent = useMemo(() => {
    if (loadingStatus) return
    if (overrideStatus) {
      return content[overrideStatus.current]?.[overrideStatus.status]
    } else {
      return content[status.current]?.[status.status]
    }
  }, [loadingStatus, status, overrideStatus])

  if (loadingStatus) {
    return <Skeleton className={'h-20 mb-6'} />
  }

  // Redirect to current step
  if (currentStep !== status.current) {
    // Manage exceptions
    let skipRedirect = false

    // If current step is 'independent' and status is 'pending' allow user to continue to 'residential'
    if (
      currentStep === 'residential' &&
      status.current === 'independent' &&
      status.status === 'pending'
    ) {
      skipRedirect = true
    }

    // If current step is 'residential' and status is 'pending' allow user to go back to 'independent'
    if (
      currentStep === 'independent' &&
      status.current === 'residential' &&
      status.status === 'pending'
    ) {
      skipRedirect = true
    }

    if (!skipRedirect) {
      redirect(routes.apply.children[status.current].path)
    }
  }

  // Don't show alert if on current page and status is incomplete
  if (currentStep === status.current && status.status === 'incomplete') {
    return null
  }

  // Only show alert if on current page
  if (currentStep !== status.current) {
    return null
  }

  return (
    <Alert className={'mb-6'}>
      <FontAwesomeIcon icon={getContent.icon || faUserGear} />
      <div className={'flex flex-wrap items-center'}>
        <div className={'ml-1 mt-1 mr-6 flex-1'}>
          <AlertTitle>{getContent.title || 'Application Incomplete'}</AlertTitle>
          <AlertDescription>
            {getContent.description || 'Your application is incomplete.'}
          </AlertDescription>
        </div>
        {getContent.link && (
          <Link href={getContent.link}>
            <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Continue Application</Button>
          </Link>
        )}
      </div>
    </Alert>
  )
}

export default Status
