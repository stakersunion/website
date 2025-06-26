'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMinus,
  faHourglassHalf,
  faCheck,
  faX,
  faBadgeCheck,
  faUser,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { Button } from '@/components/ui/button'
import { useProfile } from '@/utils/query/user/profile'
import { useVerification, useVerificationStatus } from '@/utils/query/user/verification'
import { useAppeal } from '@/utils/query/user/appeal'
import { routes } from '@/utils/routes'

const Status = () => {
  const { data: profile, isLoading: loadingProfile } = useProfile()
  const { data: verification, isLoading: loadingVerification } = useVerification()
  const { data: status, isLoading: loadingStatus } = useVerificationStatus()
  const { data: appeal, isLoading: loadingAppeal } = useAppeal()

  if (loadingProfile || loadingVerification || loadingStatus || loadingAppeal) {
    return <Skeleton className={'h-[400px]'} />
  }

  const icon = {
    incomplete: faMinus,
    pending: faHourglassHalf,
    approved: faCheck,
    rejected: faX,
    ineligible: faCheck,
  }

  const profileElements = [
    {
      title: 'Discord',
      status: profile.discord,
      link: routes.account.children.profile.children.user.path,
    },
    {
      title: 'Withdrawal Address',
      status: profile.withdrawalAddress,
      link: routes.account.children.profile.children.user.path,
    },
    {
      title: 'Clients',
      status: profile.clients[0].execution !== '' && profile.clients[0].consensus !== '',
      link: routes.account.children.profile.children.validator.path,
    },
    {
      title: 'Region',
      status: profile.region,
      link: routes.account.children.profile.children.validator.path,
    },
  ]

  const incompleteProfileElements = () => {
    return profileElements.filter((element) => !element.status)
  }

  const incompletePassport = () => {
    if (!verification.passport) {
      return {
        message: 'No passport address found',
        link: routes.account.children.profile.children.passport.path,
        linkText: 'Add Passport',
      }
    } else if (
      verification.passport.address &&
      verification.passport.score < process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_MINIMUM
    ) {
      return {
        message: 'Passport score below minimum',
        link: 'https://app.passport.xyz/',
        linkText: 'Update Passport',
        linkTarget: '_blank',
      }
    } else if (new Date(verification.passport.expires) < new Date()) {
      return {
        message: 'Passport expired',
        link: 'https://app.passport.xyz/',
        linkText: 'Update Passport',
        linkTarget: '_blank',
      }
    } else {
      return false
    }
  }

  return (
    <div className={'space-y-6'}>
      <Card>
        <CardHeader>
          <CardTitle>
            <FontAwesomeIcon
              icon={faBadgeCheck}
              className={'mr-2'}
            />
            Verification Status
          </CardTitle>
          <CardDescription>
            A summary of your progress with the Stakers Union verification process
          </CardDescription>
        </CardHeader>
        <CardContent className={'flex gap-3 flex-wrap md:flex-nowrap'}>
          <Alert>
            <AlertTitle>Proof of Eligibility</AlertTitle>
            <AlertDescription className={'text-muted-foreground'}>
              <FontAwesomeIcon
                icon={icon[verification.eligibility.status || 'incomplete']}
                className={'mr-2'}
              />
              {verification.eligibility.status || 'incomplete'}
              {appeal && appeal.status === 'pending' && ' - under appeal'}
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertTitle>Proof of Independent Operation</AlertTitle>
            <AlertDescription className={'text-muted-foreground'}>
              <FontAwesomeIcon
                icon={icon[verification.independent.status || 'incomplete']}
                className={'mr-2'}
              />
              {verification.independent.status || 'incomplete'}
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertTitle>Proof of Residential Operation</AlertTitle>
            <AlertDescription className={'text-muted-foreground'}>
              <FontAwesomeIcon
                icon={icon[verification.residential.status || 'incomplete']}
                className={'mr-2'}
              />
              {verification.residential.status || 'incomplete'}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          {(status.current !== 'residential' ||
            (status.status !== 'approved' && status.status !== 'ineligible')) && (
            <Link href={routes.apply.children[status.current].path}>
              <Button>Continue Application</Button>
            </Link>
          )}
        </CardFooter>
      </Card>

      {incompleteProfileElements().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              <FontAwesomeIcon
                icon={faUser}
                className={'mr-2'}
              />
              Profile Status
            </CardTitle>
            <CardDescription>A summary of incomplete profile elements</CardDescription>
          </CardHeader>
          <CardContent className={'flex gap-3 flex-wrap md:flex-nowrap md:grid md:grid-cols-3'}>
            {incompleteProfileElements().map((element) => (
              <Alert
                key={element.title}
                className={'flex flex-row'}
              >
                <div className={'flex flex-1 flex-col mr-2'}>
                  <AlertTitle>{element.title}</AlertTitle>
                  <AlertDescription className={'text-muted-foreground'}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className={'mr-2'}
                    />
                    Incomplete
                  </AlertDescription>
                </div>
                <Link href={element.link}>
                  <Button size={'sm'}>Update Profile</Button>
                </Link>
              </Alert>
            ))}
            {incompletePassport() && (
              <Alert className={'flex flex-row'}>
                <div className={'flex flex-1 flex-col mr-2'}>
                  <AlertTitle>Passport</AlertTitle>
                  <AlertDescription className={'text-muted-foreground'}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className={'mr-2'}
                    />
                    {incompletePassport().message || 'Incomplete'}
                  </AlertDescription>
                </div>
                <Link
                  target={incompletePassport().linkTarget}
                  href={incompletePassport().link}
                >
                  <Button size={'sm'}>{incompletePassport().linkText}</Button>
                </Link>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Status
