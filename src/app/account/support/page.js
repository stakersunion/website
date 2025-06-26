'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import { useUser } from '@/utils/query/user'
import { useNotify } from '@/utils/query/send'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faEnvelope } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Support = () => {
  const { mutateAsync: send, isPending: sending, isSuccess: success } = useNotify()
  const { data: user, isLoading } = useUser()

  const formSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    message: z.string().min(1, { message: 'Message is required' }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: null,
      email: '',
      message: '',
    },
    values: {
      id: user?.id,
      email: user?.profile?.email,
    },
  })

  const onSubmit = async (values) => {
    try {
      await send({
        title: 'Stakers Union Member Support',
        content: `Email: ${values.email}\n\n
        ID: ${values.id}\n\n
  
        Message:\n\n
        ${values.message}`,
        email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        subject: 'Stakers Union Contact',
      })

      form.reset()
      toast.success('Message sent successfully')
    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'space-y-8'}
      >
        <Card>
          <CardHeader>
            <CardTitle>Member Support</CardTitle>
            <CardDescription>Let us know how we can help!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={'flex flex-col gap-6'}>
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
                    <FormMessage className={'ml-2 text-xs text-red-500'} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'message'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={'Your message'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={'ml-2 text-xs text-red-500'} />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={sending}
              type={'submit'}
            >
              {sending ? (
                <FontAwesomeIcon
                  icon={faLoader}
                  className={'mr-2 h-4 w-4 animate-spin'}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={'mr-2'}
                />
              )}
              Send
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default Support
