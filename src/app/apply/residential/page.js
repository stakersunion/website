'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleInfo, faCheck } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { PhotoForm } from '@/components/apply'
import { useVerification } from '@/utils/query/user/verification'
import { routes } from '@/utils/routes'

const ApplyResidential = () => {
  const { data: verification, isLoading } = useVerification()

  if (isLoading) {
    return <Skeleton className={'h-[400px]'} />
  }

  // Address not yet verified, redirect to eligibility page
  if (verification.eligibility.status !== 'approved') {
    redirect(routes.apply.children.eligibility.path)
  }

  // Photo has been submitted and is pending
  if (verification.residential.photo && verification.residential.status === 'pending') {
    return (
      <Alert>
        <FontAwesomeIcon icon={faFileCircleInfo} />
        <AlertTitle>Photo Pending</AlertTitle>
        <AlertDescription>
          You have submitted a photo that is pending approval. You will be notified by email when
          your photo has been approved.
        </AlertDescription>
      </Alert>
    )
  }

  // Step completed, redirect to next step
  if (verification.residential.status === 'approved') {
    return (
      <Alert>
        <FontAwesomeIcon icon={faCheck} />
        <div className={'flex flex-wrap items-center'}>
          <div className={'ml-1 mt-1 mr-6 flex-1'}>
            <AlertTitle>Application Complete</AlertTitle>
            <AlertDescription>Your application has been completed and approved.</AlertDescription>
          </div>
          <Link href={routes.account.path}>
            <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Manage Account</Button>
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
                <li>The hardware should be clearly visible.</li>
                <li>
                  An international newspaper front page or a printout of a news website must be
                  included, with the text "Stakers Union" visibly written on it.
                </li>
              </ol>
            </AlertDescription>
          </div>
          <Link
            target={'_blank'}
            href={
              'https://docs.stakersunion.com/membership/verification#proof-of-residential-operation'
            }
          >
            <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Read More</Button>
          </Link>
        </div>
      </Alert>
      <PhotoForm />
    </div>
  )
}

export default ApplyResidential
