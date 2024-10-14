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
  const { data: profile, isLoading: loadingProfile } = useProfile()
  const { data: addresses, isLoading: loadingAddresses } = useAddresses()
  const { mutateAsync: updateProfile, isPending: updatingProfile, isSuccess } = useUpdateProfile()

  const formSchema = z.object({
    passport: z.object({
      score: z.number().int().min(0).max(100),
      address: z.string().refine((value) => isAddress(value), {
        message: 'Invalid address',
      }),
      expires: z.date().nullable(),
    }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passport: {
        score: 0,
        address: '',
        expires: null,
      },
    },
    values: profile,
  })

  const onSubmit = async (values) => {
    await updateProfile(values)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully')
    }
  }, [isSuccess])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'space-y-6'}
      >
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

        <Score
          addresses={addresses}
          loading={loadingAddresses}
        />

        <Addresses
          addresses={addresses}
          loading={loadingAddresses}
        />

        <div className={'flex pt-6'}>
          <div className={'flex flex-1 justify-end'}>
            <Button
              disabled={loadingProfile || updatingProfile}
              type={'submit'}
            >
              {updatingProfile && (
                <FontAwesomeIcon
                  icon={faLoader}
                  className={'mr-2 h-4 w-4 animate-spin'}
                />
              )}
              Save
            </Button>
            <Link href={routes.account.children.profile.children.validator.path}>
              <Button
                disabled={loadingProfile || updatingProfile}
                type={'button'}
                variant={'ghost'}
                className={'ml-2'}
              >
                Next
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ProfilePassport
