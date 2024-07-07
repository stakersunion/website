'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
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
import { useCreateAddress } from '@/utils/query/admin/user/address'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const AddAddress = ({ id }) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync: createAddress, isPending, isSuccess, error } = useCreateAddress({ id })
  const addressTypes = [
    { value: 'solo', label: 'Solo' },
    { value: 'rocketpool', label: 'Rocket Pool' },
    { value: 'dvt', label: 'DVT' },
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
  })

  const onSubmit = async (values) => {
    await createAddress(values)
    setOpen(false)
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
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button>
          <FontAwesomeIcon
            icon={faPlus}
            className={'mr-2'}
          />
          Add Address
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Address</SheetTitle>
          <SheetDescription>Add a verified address</SheetDescription>
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
                disabled={isPending}
                type={'submit'}
              >
                {isPending && (
                  <FontAwesomeIcon
                    icon={faLoader}
                    className={'mr-2 h-4 w-4 animate-spin'}
                  />
                )}
                Add
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default AddAddress
