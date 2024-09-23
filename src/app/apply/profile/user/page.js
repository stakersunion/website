'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAddress } from 'ethers'
import { useForm } from 'react-hook-form'
import { User } from '@/components/user/profile/forms'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const ApplyProfileUser = () => {
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending, isSuccess } = useUpdateProfile()
  const router = useRouter()
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    discord: z.string().optional(),
    withdrawalAddress: z
      .string()
      .optional()
      .refine((value) => (value ? isAddress(value) : true), {
        message: 'The provided ETH address is invalid.',
      }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      discord: '',
      withdrawalAddress: '',
    },
    values: profile,
  })

  const onSubmit = async (values) => {
    await updateProfile(values)
    router.push(routes.apply.children.profile.children.validator.path)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('User information updated successfully, redirecting...')
    }
  }, [isSuccess])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <User
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

export default ApplyProfileUser