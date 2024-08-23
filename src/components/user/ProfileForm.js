'use client'

import { useState, useEffect } from 'react'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAddress } from 'ethers'
import { useForm } from 'react-hook-form'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTools, faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const ProfileForm = ({ callback = () => {}, submitText = 'Save', extraActions = null }) => {
  const [section, setSection] = useState('user')
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending, isSuccess } = useUpdateProfile()

  const exectionOptions = [
    { value: 'geth', label: 'Geth' },
    { value: 'nethermind', label: 'Nethermind' },
    { value: 'besu', label: 'Besu' },
    { value: 'erigon', label: 'Erigon' },
    { value: 'reth', label: 'Reth' },
  ]
  const consensusOptions = [
    { value: 'lighthouse', label: 'Lighthouse' },
    { value: 'lodestar', label: 'Lodestar' },
    { value: 'nimbus', label: 'Nimbus' },
    { value: 'prysm', label: 'Prysm' },
    { value: 'teku', label: 'Teku' },
  ]

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    discord: z.string().optional(),
    withdrawalAddress: z
      .string()
      .optional()
      .refine((value) => (value ? isAddress(value) : true), {
        message: 'The provided ETH address is invalid.',
      }),
    execution: z.enum(exectionOptions.map((client) => client.value)).optional(),
    consensus: z.enum(consensusOptions.map((client) => client.value)).optional(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      discord: '',
      withdrawalAddress: '',
      execution: '',
      consensus: '',
    },
    values: profile,
  })

  const onSubmit = async (values) => {
    await updateProfile(values)
    callback()
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully')
    }
  }, [isSuccess])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={'flex flex-col sm:flex-row gap-6'}>
          <div className={'flex flex-col sm:w-1/5 gap-2'}>
            <Button
              type={'button'}
              variant={section === 'user' ? 'secondary' : 'ghost'}
              onClick={() => setSection('user')}
              className={'w-full justify-start'}
            >
              <FontAwesomeIcon
                icon={faUser}
                className={'mr-2'}
              />
              User Info
            </Button>
            <Button
              type={'button'}
              variant={section === 'validator' ? 'secondary' : 'ghost'}
              onClick={() => setSection('validator')}
              className={'w-full justify-start'}
            >
              <FontAwesomeIcon
                icon={faTools}
                className={'mr-2'}
              />
              Validator Info
            </Button>
          </div>
          <div className={'sm:w-4/5'}>
            {section === 'user' && (
              <div className={'space-y-8'}>
                <div className={'columns-1 md:columns-2 gap-x-6 space-y-6'}>
                  <FormField
                    control={form.control}
                    name={'name'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={'John Smith'}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <div className={'flex'}>
                          <FormDescription className={'text-xs'}>
                            Your public display name.
                          </FormDescription>
                          <FormMessage className={'ml-2 text-xs text-red-500'} />
                        </div>
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
                        <div className={'flex'}>
                          <FormDescription className={'text-xs'}>
                            Your preferred contact email used for notifications. Use an anonymous
                            service!
                          </FormDescription>
                          <FormMessage className={'ml-2 text-xs text-red-500'} />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={'columns-1 md:columns-2 gap-x-6 space-y-6'}>
                  <FormField
                    control={form.control}
                    name={'discord'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discord</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <div className={'flex'}>
                          <FormDescription className={'text-xs'}>
                            Your Discord handle, used to provide members-only access.
                          </FormDescription>
                          <FormMessage className={'ml-2 text-xs text-red-500'} />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={'withdrawalAddress'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Withdrawal Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={'0x...'}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <div className={'flex'}>
                          <FormDescription className={'text-xs'}>
                            The ETH address used to distribute incentives.
                          </FormDescription>
                          <FormMessage className={'ml-2 text-xs text-red-500'} />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            {section === 'validator' && (
              <div className={'columns-1 md:columns-2 gap-x-6 space-y-8'}>
                <FormField
                  control={form.control}
                  name={'execution'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Execution Client</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={'Execution Client'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {exectionOptions.map((client) => (
                              <SelectItem
                                key={client.value}
                                value={client.value}
                              >
                                {client.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={'consensus'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consensus Client</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={'Consensus Client'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {consensusOptions.map((client) => (
                              <SelectItem
                                key={client.value}
                                value={client.value}
                              >
                                {client.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </div>
        <div className={'flex pt-6'}>
          <div className={'flex flex-1'}>
            <Button
              disabled={isLoading || isPending}
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

export default ProfileForm
