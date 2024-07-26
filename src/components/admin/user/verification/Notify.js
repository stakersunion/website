'use client'

import { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faEnvelope } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { useNotify } from '@/utils/query/send'

const Notify = ({ step, user }) => {
  const { mutate: notify, isPending: loadingNotify, isSuccess: successNotify } = useNotify()

  const formSchema = z.object({
    poap: z.lazy(() =>
      step.key === 'independent'
        ? z
            .string()
            .url()
            .refine((value) => value, {
              message: 'POAP URL is required for the independent step.',
            })
        : z.string().optional()
    ),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poap: '',
    },
  })

  const createMessage = (step, poap) => {
    let message = {
      name: user.profile.name,
      email: user.profile.email,
    }

    switch (step) {
      case 'eligibility':
        message = {
          ...message,
          title: 'Address Eligibility Verified',
          content:
            'Your signed oath has been verified, you can now continue to the next steps! Sign back in to the Stakers Union members area to continue.',
          buttonText: 'Stakers Union',
          href: 'https://stakersunion.com',
          subject: 'Address Eligibility Verified',
        }
        break
      case 'independent':
        message = {
          ...message,
          title: 'Proof of Independent Operation',
          content: `Your proof of independent operation has been verified!`,
          buttonText: 'Mint your Verified POAP',
          href: poap,
          subject: 'Proof of Independent Operation',
        }
        break
      case 'residential':
        message = {
          ...message,
          title: 'Proof of Residential Operation',
          content: 'Your proof of residential operation photo has been verified!',
          buttonText: 'Stakers Union',
          href: 'https://stakersunion.com',
          subject: 'Proof of Residential Operation',
        }
        break
      default:
        break
    }
    return message
  }

  const onSubmit = async (values) => {
    const message = createMessage(step.key, values.poap)
    notify(message)
  }

  useEffect(() => {
    if (successNotify) {
      toast.success('Notification sent successfully')
    }
  }, [successNotify])

  if (loadingNotify) {
    return (
      <FontAwesomeIcon
        icon={faLoader}
        spin={true}
      />
    )
  }

  return (
    <Dialog>
      <DialogTrigger>
        <FontAwesomeIcon
          className={'cursor-pointer'}
          icon={faEnvelope}
        />
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'space-y-8'}
          >
            <DialogHeader>
              <DialogTitle>Send Notification?</DialogTitle>
              <DialogDescription>
                Confirm sending {step.key} approval notification to user {user.profile?.name} at{' '}
                {user.profile?.email}?
              </DialogDescription>
            </DialogHeader>
            {step.key === 'independent' && (
              <FormField
                control={form.control}
                name={'poap'}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={'https://poap.xyz/123'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={'ml-2 text-xs text-red-500'} />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={'secondary'}>Cancel</Button>
              </DialogClose>
              <Button
                disabled={loadingNotify}
                type={'submit'}
              >
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default Notify
