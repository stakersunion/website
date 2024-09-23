'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Validator,
  executionOptions,
  consensusOptions,
  regionOptions,
} from '@/components/user/profile/forms'
import { useForm, useFieldArray } from 'react-hook-form'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const ProfileValidator = () => {
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending, isSuccess } = useUpdateProfile()
  const router = useRouter()
  const formSchema = z.object({
    clients: z
      .array(
        z.object({
          execution: z
            .union([z.enum(executionOptions.map((client) => client.value)), z.string().length(0)])
            .optional(),
          consensus: z
            .union([z.enum(consensusOptions.map((client) => client.value)), z.string().length(0)])
            .optional(),
        })
      )
      .optional(),
    region: z.enum(regionOptions).optional(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clients: [
        {
          execution: '',
          consensus: '',
        },
      ],
      region: '',
    },
    values: profile,
  })

  const onSubmit = async (values) => {
    await updateProfile(values)
    router.push(routes.apply.children.eligibility.path)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully')
    }
  }, [isSuccess])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Validator
          form={form}
          isLoading={isLoading}
        />

        <div className={'flex pt-6'}>
          <div className={'flex flex-1 justify-end'}>
            <Link href={routes.account.children.profile.children.user.path}>
              <Button
                type={'button'}
                variant={'ghost'}
                className={'mr-2'}
              >
                Previous
              </Button>
            </Link>
            <Button
              disabled={isLoading || isPending}
              type={'submit'}
            >
              {isPending && (
                <FontAwesomeIcon
                  icon={faLoader}
                  className={'mr-2 h-4 w-4 animate-spin'}
                />
              )}
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ProfileValidator
