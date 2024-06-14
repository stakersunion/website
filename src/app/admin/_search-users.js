'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const SearchUsers = () => {
  const router = useRouter()
  const pathname = usePathname()

  const formSchema = z.object({
    user: z.string().min(2).max(50),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: '',
    },
  })

  const onSubmit = ({ user }) => {
    router.push(pathname + '?search=' + user)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'space-y-8'}
      >
        <FormField
          control={form.control}
          name={'user'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search for User</FormLabel>
              <FormControl>
                <Input
                  placeholder={'User Address'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type={'submit'}>Search</Button>
      </form>
    </Form>
  )
}
