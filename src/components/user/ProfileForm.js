'use client'

import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAddress } from 'ethers'
import { useForm } from 'react-hook-form'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const ProfileForm = ({ callback = () => {}, submitText = 'Save', extraActions = null }) => {
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending, isSuccess } = useUpdateProfile()

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
    callback()
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
        className={'space-y-8'}
      >
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'John Smith'}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <div className={'flex'}>
                  <FormDescription className={'text-xs'}>Your public display name.</FormDescription>
                  <FormMessage className={'ml-2 text-xs text-red-500'} />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'test@example.com'}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <div className={'flex'}>
                  <FormDescription className={'text-xs'}>
                    Your preferred contact email.
                  </FormDescription>
                  <FormMessage className={'ml-2 text-xs text-red-500'} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={'columns-1 md:columns-2 gap-x-6'}>
          <FormField
            control={form.control}
            name={'discord'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discord</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <div className={'flex'}>
                  <FormDescription className={'text-xs'}>
                    Your Discord handle, used to provide members-only access.
                  </FormDescription>
                  <FormMessage className={'ml-2 text-xs text-red-500'} />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'withdrawalAddress'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Withdrawal Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'0x...'}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <div className={'flex'}>
                  <FormDescription className={'text-xs'}>
                    The ETH address used to distribute incentives.
                  </FormDescription>
                  <FormMessage className={'ml-2 text-xs text-red-500'} />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className={'flex'}>
          <div className={'flex flex-1'}>
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
              {submitText}
            </Button>
          </div>
          {extraActions}
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm
