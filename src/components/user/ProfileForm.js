'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
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
import { Location } from '@/components/user/profile'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAddress } from 'ethers'
import { useForm, useFieldArray } from 'react-hook-form'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faTools,
  faLoader,
  faPlus,
  faMinus,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const ProfileForm = ({ callback = () => {}, submitText = 'Save', extraActions = null }) => {
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending, isSuccess } = useUpdateProfile()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const tab = searchParams.get('tab') || 'user'

  const executionOptions = [
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
  const regionOptions = ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania']

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
    clients: z
      .array(
        z.object({
          execution: z
            .union([z.enum(executionOptions.map((client) => client.value)), z.string().length(0)])
            .optional(),
          consensus: z
            .union([z.enum(consensusOptions.map((client) => client.value)), z.string().length(0)])
            .optional(),
        })
      )
      .optional(),
    region: z.enum(regionOptions).optional(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      discord: '',
      withdrawalAddress: '',
      clients: [
        {
          execution: '',
          consensus: '',
        },
      ],
      region: '',
    },
    values: profile,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'clients',
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
              variant={tab === 'user' ? 'secondary' : 'ghost'}
              onClick={() => router.push(`${pathname}?tab=user`)}
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
              variant={tab === 'validator' ? 'secondary' : 'ghost'}
              onClick={() => router.push(`${pathname}?tab=validator`)}
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
            {tab === 'user' && (
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
            {tab === 'validator' && (
              <div className={'flex flex-1 flex-col gap-6'}>
                {fields.map((item, index) => {
                  return (
                    <div
                      className={'flex flex-col sm:flex-row gap-6'}
                      key={`clients-field-${item.id}`}
                    >
                      <FormField
                        control={form.control}
                        name={`clients.${index}.execution`}
                        render={({ field }) => {
                          return (
                            <FormItem className={'flex flex-1 flex-col'}>
                              <FormLabel>
                                Execution Client {index !== 0 && `#${index + 1}`}
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  disabled={isLoading}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={'Execution Client'} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {executionOptions.map((client) => (
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
                          )
                        }}
                      />
                      <FormField
                        control={form.control}
                        name={`clients.${index}.consensus`}
                        render={({ field }) => (
                          <FormItem className={'flex flex-1 flex-col'}>
                            <FormLabel>Consensus Client {index !== 0 && `#${index + 1}`}</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isLoading}
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
                      <div className={'sm:self-end flex gap-2 w-24'}>
                        {index === fields.length - 1 && (
                          <Button
                            type={'button'}
                            onClick={() => append({ execution: '', consensus: '' })}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                            <span className={'sm:hidden inline ml-2'}>Add</span>
                          </Button>
                        )}
                        {fields.length > 1 && (
                          <Button
                            type={'button'}
                            onClick={() => remove(index)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                            <span className={'sm:hidden inline ml-2'}>Remove</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
                <div className={'flex flex-1 mt-6'}>
                  <FormField
                    control={form.control}
                    name={'region'}
                    render={({ field }) => (
                      <Location
                        field={field}
                        isLoading={isLoading}
                      />
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={'flex pt-6'}>
          <div className={'flex flex-1 justify-end'}>
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
