'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleInfo, faCamera } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useVerification } from '@/utils/query/user/verification'
import { ScheduleForm } from '@/components/apply'
import { routes } from '@/utils/routes'

const ApplyIndependent = () => {
  const { data: verification, isLoading } = useVerification()

  if (isLoading) {
    return <Skeleton className={'h-[400px]'} />
  }

  // Address not yet verified, redirect to eligibility page
  if (verification.eligibility.status !== 'approved') {
    redirect(routes.apply.children.eligibility.path)
  }

  // Schedule has been set and is pending
  if (verification.independent.status === 'pending') {
    return (
      <Alert>
        <FontAwesomeIcon icon={faFileCircleInfo} />
        <div className={'flex flex-wrap items-center'}>
          <div className={'ml-1 mt-1 mr-6 flex-1'}>
            <AlertTitle>You're Scheduled</AlertTitle>
            <AlertDescription>
              You are scheduled to disable attestations on{' '}
              <strong>
                {new Date(verification.independent.schedule).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </strong>
              . You will receive an update after your verification is complete. You can proceed to
              the next step while you wait.
            </AlertDescription>
          </div>
          <Link href={routes.apply.children.residential.path}>
            <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Next</Button>
          </Link>
        </div>
      </Alert>
    )
  }

  return (
    <div>
      <Alert>
        <FontAwesomeIcon icon={faFileCircleInfo} />
        <div className={'flex flex-wrap items-center'}>
          <div className={'ml-1 mt-1 mr-6 flex-1'}>
            <AlertTitle>Instructions</AlertTitle>
            <AlertDescription>
              <ol className={'mt-2 ml-4 list-decimal'}>
                <li>Select a date/time from the options below to complete verification</li>
                <li>
                  Temporarily disable attestations at the scheduled time (2 attestations minimum)
                </li>
                <li>
                  You will only have one opportunity to complete verification of independent
                  operation
                </li>
              </ol>
            </AlertDescription>
          </div>
          <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Detailed Instructions</Button>
        </div>
      </Alert>
      <ScheduleForm />
    </div>
  )
}

export default ApplyIndependent
