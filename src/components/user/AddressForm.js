'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { isAddress } from 'ethers'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useSubmitAddress } from '@/utils/query/user/addresses'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const AddressForm = ({ callback = () => {}, submitText = 'Submit', extraActions = null }) => {
  const { mutateAsync: submitAddress, isPending, isSuccess, error } = useSubmitAddress()

  const formSchema = z.object({
    address: z.string().refine((value) => isAddress(value), {
      message: 'The provided ETH address is invalid.',
    }),
    type: z.enum(['withdrawal', 'deposit'], {
      errorMap: () => ({ message: 'Type must be either "withdrawal" or "deposit".' }),
    }),
    signature: z.string().url(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      type: '',
      signature: '',
    },
  })

  const onSubmit = async (values) => {
    await submitAddress(values)
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
          name={'address'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder={'0x...'}
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'type'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={'Address Type'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'withdrawal'}>Withdrawal</SelectItem>
                    <SelectItem value={'deposit'}>Deposit</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

export default AddressForm
