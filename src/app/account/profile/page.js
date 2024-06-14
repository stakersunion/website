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
import { useForm } from 'react-hook-form'
import { useUser, useUpdateUser } from '@/utils/query/user'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Profile = () => {
  const { data: user, isLoading, isError } = useUser()
  const { mutate: updateUser, isPending, isSuccess } = useUpdateUser()

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
    values: user,
  })

  const onSubmit = (values) => {
    updateUser(values)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully')
    }
  }, [isSuccess])

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={'space-y-8'}
        >
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
                <FormDescription>Your public display name.</FormDescription>
                <FormMessage />
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
                <FormDescription>Your preferred contact email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </form>
      </Form>
    </div>
  )
}

export default Profile
