'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Score, Addresses } from '@/components/user/profile'
import { Add } from '@/components/user/addresses'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAddress } from 'ethers'
import { useForm } from 'react-hook-form'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { useAddresses } from '@/utils/query/user/address'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faLightbulb } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const ProfilePassport = () => {
  return (
    <div className={'space-y-6'}>
      <Alert className={'flex flex-row'}>
        <FontAwesomeIcon icon={faLightbulb} />
        <div>
          <AlertTitle>Gitcoin Passport</AlertTitle>
          <AlertDescription>
            Stakers Union uses your{' '}
            <Link
              target={'_blank'}
              className={'underline underline-offset-2 hover:no-underline'}
              href={'https://passport.gitcoin.co/'}
            >
              Gitcoin Passport
            </Link>{' '}
            score for additional verification. Your associated addresses and their Passport scores
            are displayed below.
          </AlertDescription>
        </div>
        <div className={'ml-2 self-center'}>
          <Add />
        </div>
      </Alert>

      <Score />

      <Addresses />

      <div className={'flex pt-6'}>
        <div className={'flex flex-1 justify-end'}>
          <Link href={routes.account.children.profile.children.validator.path}>
            <Button
              type={'button'}
              variant={'ghost'}
              className={'mr-2'}
            >
              Previous
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfilePassport
