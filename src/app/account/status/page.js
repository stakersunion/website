'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faCircleMinus,
  faCircleX,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useVerification } from '@/utils/query/user/verification'

const Status = () => {
  const { data: verification, isLoading } = useVerification()

  if (isLoading) {
    return <Skeleton className={'h-[400px]'} />
  }

  const icon = {
    pending: faCircleMinus,
    approved: faCircleCheck,
    rejected: faCircleX,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
        <CardDescription>
          A summary of your progress with the Stakers Union verification process
        </CardDescription>
      </CardHeader>
      <CardContent className={'flex gap-3'}>
        <Alert>
          <AlertTitle>Proof of Eligibility</AlertTitle>
          <AlertDescription className={'text-muted-foreground'}>
            <FontAwesomeIcon
              icon={icon[verification.eligibility.status]}
              className={'mr-2'}
            />
            {verification.eligibility.status}
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertTitle>Proof of Independent Operation</AlertTitle>
          <AlertDescription className={'text-muted-foreground'}>
            <FontAwesomeIcon
              icon={icon[verification.independent.status]}
              className={'mr-2'}
            />
            {verification.independent.status}
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertTitle>Proof of Residential Operation</AlertTitle>
          <AlertDescription className={'text-muted-foreground'}>
            <FontAwesomeIcon
              icon={icon[verification.independent.status]}
              className={'mr-2'}
            />
            {verification.residential.status}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

export default Status
