'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useUser, useUpdateUser } from '@/utils/query/admin/user'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { Skeleton } from '@/components/ui/skeleton'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faArrowLeft, faEdit } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes, getRoute } from '@/utils/routes'

const Edit = ({ params }) => {
  const { id } = params
  const { data: user, isLoading } = useUser({ id })
  const { mutate: updateUser, isPending, isSuccess } = useUpdateUser({ id })

  const onSubmit = (values) => {
    updateUser(values)
  }

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

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account updated successfully')
    }
  }, [isSuccess])

  if (isLoading) {
    return <Skeleton className={'w-full h-96'} />
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>User</CardTitle>
        <CardDescription>{user.id}</CardDescription>
      </CardHeader>
      <CardContent>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className={'flex flex-1'}>
          <Link href={getRoute({ path: routes.admin.children.view.path, params: { id } })}>
            <Button>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className={'mr-2'}
              />
              Back
            </Button>
          </Link>
        </div>
        <Button
          disabled={isLoading || isPending}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isPending && (
            <FontAwesomeIcon
              icon={faLoader}
              className={'mr-2 h-4 w-4 animate-spin'}
            />
          )}
          Save
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Edit
