'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, redirect } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CalendarFile } from '@/components/apply'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignature,
  faSignatureSlash,
  faLoader,
  faServer,
  faHouse,
  faHouseCircleCheck,
  faHouseCircleXmark,
  faHouseCircleExclamation,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useVerification, useVerificationStatus } from '@/utils/query/user/verification'
import { routes } from '@/utils/routes'

const Status = ({ setReplace }) => {
  const pathname = usePathname()
  const currentStep = Object.keys(routes.apply.children).find((key) =>
    pathname.startsWith(routes.apply.children[key].path)
  )
  const { data: status, isLoading: loadingStatus, isRefetching } = useVerificationStatus()
  const {
    data: verification,
    isLoading: loadingVerification,
    isRefetching: refetchingVerification,
  } = useVerification()
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

      // For 'residential' step, should hide content if current step is 'residential' and status is 'ineligible'
      else if (
        currentStep === 'residential' &&
        status.current === 'residential' &&
        status.status === 'ineligible'
      ) {
        setReplace(true)
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
    [loadingStatus, isRefetching, setReplace, setOverrideStatus, currentStep, status, verification]
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
        icon: faLoader,
        iconClassName: 'animate-spin',
        title: 'Proof of Eligibility Pending',
        description:
          'You have submitted an address that is pending approval. Please wait while we attempt automatic verification.',
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
          'Your signature has been rejected. You can enter another signature to try again or submit an appeal for manual review.',
        link: routes.account.children.appeal.path,
        linkText: 'Submit Appeal',
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
        description: `You have selected ${new Date(
          verification?.independent?.schedule
        ).toLocaleString(undefined, { timeZoneName: 'long' })} or ${new Date(
          verification?.independent?.schedule
        ).toLocaleString(undefined, {
          timeZone: 'UTC',
          timeZoneName: 'short',
        })} to disable attestations. You will be notified by email after your proof has been verified. You may continue to Proof of Residential Operation.`,
        extra: (
          <div className={'flex gap-x-4'}>
            <CalendarFile />
            <Link href={routes.apply.children.residential.path}>
              <Button>Continue</Button>
            </Link>
          </div>
        ),
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
      ineligible: {
        icon: faHouseCircleExclamation,
        title: 'Proof of Residential Operation Ineligible',
        description:
          'You have selected that you are not a residential operator. Your application is complete.',
        link: routes.account.path,
        linkText: 'Dashboard',
      },
    },
  }

  const getContent = useMemo(() => {
    if (loadingStatus || loadingVerification || refetchingVerification) {
      return {
        title: <Skeleton className={'w-56 h-5 mt-0 mb-4'} />,
        description: (
          <div className={'flex flex-col gap-2'}>
            <Skeleton className={'w-full h-3'} />
            <Skeleton className={'w-64 h-3'} />
          </div>
        ),
      }
    }

    if (overrideStatus) {
      return content[overrideStatus.current]?.[overrideStatus.status]
    } else {
      return content[status.current]?.[status.status]
    }
  }, [loadingStatus, loadingVerification, refetchingVerification, status, overrideStatus])

  if (loadingStatus || loadingVerification) {
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

  // Only show alert if on current page (using overrrideStatus if applicable)
  if (currentStep !== status.current && currentStep !== overrideStatus?.current) {
    return null
  }

  return (
    <Alert className={'mb-6'}>
      <FontAwesomeIcon
        icon={getContent.icon}
        className={getContent?.iconClassName || ''}
      />
      <div className={'flex flex-wrap items-center'}>
        <div className={'ml-1 mt-1 mr-6 flex-1'}>
          <AlertTitle>{getContent.title}</AlertTitle>
          <AlertDescription>{getContent.description}</AlertDescription>
        </div>
        {getContent.extra && getContent.extra}
        {!getContent.extra && getContent.link && (
          <Link href={getContent.link}>
            <Button
              className={'mt-2 sm:mt-0 sm:w-auto w-full'}
              variant={getContent?.linkVariant || 'default'}
            >
              {getContent.linkText || 'Continue Application'}
            </Button>
          </Link>
        )}
      </div>
    </Alert>
  )
}

export default Status
