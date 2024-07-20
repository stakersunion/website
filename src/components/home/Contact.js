'use client'

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
import { useNotify } from '@/utils/query/send'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faEnvelope } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Contact = () => {
  const { mutateAsync: send, isPending: sending } = useNotify()

  const formSchema = z.object({
    email: z.string().email(),
    message: z.string().min(1),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  })

  const onSubmit = async (values) => {
    await send({
      title: 'Stakers Union Contact',
      content: `Email: ${values.email}\n\n

      Message:\n\n
      ${values.message}`,
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      subject: 'Stakers Union Contact',
    })

    form.reset()
    toast.success('Message sent successfully')
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={'space-y-8'}
        >
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
                  <FormLabel>Email</FormLabel>
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
        </form>
      </Form>
    </div>
  )
}

export default Contact
