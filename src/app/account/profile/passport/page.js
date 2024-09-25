'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Passport } from '@/components/user/profile'
import { Add } from '@/components/user/addresses'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAddress } from 'ethers'
import { useForm } from 'react-hook-form'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faLightbulb } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const ProfilePassport = () => {
  const { data: profile, isLoading: loadingProfile } = useProfile()
  const { mutateAsync: updateProfile, isPending: updatingProfile, isSuccess } = useUpdateProfile()

  const formSchema = z.object({
    passportAddress: z
      .string()
      .optional()
      .refine((value) => (value ? isAddress(value) : true), {
        message: 'The provided ETH address is invalid.',
      }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passportAddress: '',
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Alert className={'flex flex-row mb-6'}>
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
              score for additional verification. Select an address to link your Gitcoin Passport.
            </AlertDescription>
          </div>
          <div className={'ml-2 self-center'}>
            <Add />
          </div>
        </Alert>

        <Passport />

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
