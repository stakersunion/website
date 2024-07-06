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
import { Switch } from '@/components/ui/switch'
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
import axios from 'axios'
import { useCreateValidator } from '@/utils/query/admin/user/validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const AddValidator = ({ id, address }) => {
  const [open, setOpen] = useState(false)
  const {
    mutateAsync: createValidator,
    isPending,
    isSuccess,
    error,
  } = useCreateValidator({ id, address })

  const formSchema = z.object({
    publicKey: z.string().regex(/^0x[a-fA-F0-9]{96}$/, { message: 'Invalid public key' }),
    index: z.number().int().positive(),
    valid: z.boolean(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      publicKey: '',
      index: 0,
      valid: false,
    },
  })

  const publicKey = form.watch('publicKey')

  useEffect(() => {
    const fetchValidatorData = async () => {
      if (formSchema.shape.publicKey.safeParse(publicKey).success) {
        try {
          const response = await axios.get(`https://beaconcha.in/api/v1/validator/${publicKey}`)
          const validatorData = response.data.data
          form.setValue('index', validatorData.validatorindex)
          if (validatorData.status === 'active_online') {
            form.setValue('valid', true)
          }
        } catch (error) {
          toast.error('Failed to load validator data')
        }
      }
    }

    fetchValidatorData()
  }, [publicKey])

  const onSubmit = async (values) => {
    await createValidator(values)
    setOpen(false)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Validator submitted successfully')
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
          Add Validator
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Validator</SheetTitle>
          <SheetDescription>Add a verified validator</SheetDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={'space-y-8'}
            >
              <FormField
                control={form.control}
                name={'publicKey'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Public Key</FormLabel>
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
                name={'index'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validator Index</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'12345'}
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
                name={'valid'}
                render={({ field }) => (
                  <FormItem>
                    <div className={'flex items-center space-x-2'}>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Valid Signature</FormLabel>
                    </div>
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

export default AddValidator
