'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
import { useAddress, useUpdateAddress } from '@/utils/query/admin/user/address'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes, getRoute } from '@/utils/routes'

const AddressForm = ({ id, address }) => {
  const { data: addressData, isLoading: addressLoading } = useAddress({ id, address })
  const {
    mutateAsync: updateAddress,
    isPending,
    isSuccess,
    error,
  } = useUpdateAddress({ id, address })
  const router = useRouter()
  const addressTypes = [
    { value: 'deposit', label: 'Deposit' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'fee-recipient', label: 'Fee Recipient' },
  ]

  const formSchema = z.object({
    address: z.string().refine((value) => isAddress(value), {
      message: 'The provided ETH address is invalid.',
    }),
    type: z.enum(addressTypes.map((type) => type.value)),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      type: '',
    },
    values: addressData,
  })

  const onSubmit = async (values) => {
    await updateAddress(values)
    let route = getRoute({
      path: routes.admin.children.address.path,
      params: {
        id,
        address: values.address,
      },
    })

    router.push(route)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Address updated successfully')
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
                  disabled={addressLoading || isPending}
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
                  value={field.value}
                  disabled={addressLoading || isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={'Address Type'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {addressTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={addressLoading || isPending}
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
  )
}

export default AddressForm
