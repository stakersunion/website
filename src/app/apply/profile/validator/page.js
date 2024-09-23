'use client'

import { useRef, useEffect } from 'react'
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
import { useForm } from 'react-hook-form'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { useVerificationStatus } from '@/utils/query/user/verification'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const ProfileValidator = () => {
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending, isSuccess } = useUpdateProfile()
  const { refetch, fetchStatus } = useVerificationStatus()
  const refetchInitiated = useRef(false)

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
    refetchInitiated.current = true
    refetch()
  }

  useEffect(
    function redirectAfterRefetch() {
      if (fetchStatus === 'idle' && refetchInitiated.current) {
        refetchInitiated.current = false
        router.push(routes.apply.children.eligibility.path)
      }
    },
    [fetchStatus]
  )

  useEffect(() => {
    if (isSuccess) {
      toast.success('Validator information updated successfully, redirecting...')
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
              Save & Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ProfileValidator
