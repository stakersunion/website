'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useUpdateVerification } from '@/utils/query/user/verification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const SignatureForm = ({ callback = () => {}, submitText = 'Submit', extraActions = null }) => {
  const { mutateAsync: updateVerification, isPending, isSuccess, error } = useUpdateVerification()

  const formSchema = z.object({
    signature: z.string().url(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signature: '',
    },
  })

  const onSubmit = async (values) => {
    await updateVerification(values)
    callback()
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Address submitted successfully')
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'space-y-8'}
      >
        <FormField
          control={form.control}
          name={'signature'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etherscan Verified Signature</FormLabel>
              <FormControl>
                <Input
                  placeholder={'https://...'}
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={'flex'}>
          <div className={'flex flex-1'}>
            <Button
              disabled={isPending}
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

export default SignatureForm
