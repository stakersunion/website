'use client'

import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import { Skeleton } from '@/components/ui/skeleton'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAddress } from 'ethers'
import { useForm } from 'react-hook-form'
import { useNotify } from '@/utils/query/send'
import { useProfile } from '@/utils/query/user/profile'
import { useUpdateAppeal } from '@/utils/query/user/appeal'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const AppealForm = ({ callback = () => {}, submitText = 'Submit', extraActions = null }) => {
  const { data: profile, isLoading: loadingProfile } = useProfile()
  const {
    mutateAsync: updateAppeal,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = useUpdateAppeal()
  const { mutateAsync: send, isPending: sendPending, isSuccess: sendSuccess } = useNotify()

  const addressTypes = [
    { value: 'deposit', label: 'Deposit' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'fee-recipient', label: 'Fee Recipient' },
  ]
  const stakingMethods = [
    { value: 'home', label: 'Home' },
    { value: 'rocketpool', label: 'Rocket Pool' },
    { value: 'allnodes', label: 'Allnodes' },
    { value: 'ssv', label: 'SSV' },
    { value: 'stakefish', label: 'Stakefish' },
    { value: 'abyss', label: 'Abyss' },
    { value: 'sensei', label: 'Sensei' },
    { value: 'chainlabo', label: 'Chainlabo' },
    { value: 'squid', label: 'Squid' },
    { value: 'other', label: 'Other' },
  ]

  const formSchema = z
    .object({
      email: z.string().email({ message: 'Invalid email' }),
      address: z.string().refine(isAddress, {
        message: 'Invalid ETH address',
      }),
      type: z.enum(
        addressTypes.map((type) => type.value),
        {
          errorMap: () => ({ message: 'Required' }),
        }
      ),
      method: z.enum(
        stakingMethods.map((method) => method.value),
        {
          errorMap: () => ({ message: 'Required' }),
        }
      ),
      otherMethod: z.string().optional(),
      rationale: z.string().min(1, { message: 'Rationale is required' }),
    })
    .refine(
      (data) => {
        if (data.method === 'other') {
          return data.otherMethod && data.otherMethod.length > 0
        }
        return true
      },
      {
        message: 'This is required when method is set to "other"',
        path: ['otherMethod'],
      }
    )

  const defaultValues = {
    email: '',
    address: '',
    type: '',
    method: '',
    otherMethod: '',
    rationale: '',
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    values: {
      ...defaultValues,
      email: profile?.email || '',
    },
  })

  const onSubmit = async (values) => {
    let updateValues = { ...values }
    if (values.method === 'other') {
      updateValues = { ...values, method: values.otherMethod }
      delete updateValues.otherMethod
    }
    await updateAppeal(values)
    await send({
      name: profile?.name,
      title: 'Stakers Union Appeal',
      content: 'Your appeal has been submitted and is pending review.',
      buttonText: 'Monitor Status',
      href: 'https://members.stakersunion.com/account/status',
      email: values.email,
      subject: 'Stakers Union Appeal',
    })
    await send({
      name: 'Thame',
      title: 'New Appeal',
      content: `A new appeal has been submitted by ${profile?.name}.`,
      buttonText: 'View Appeal',
      href: 'https://members.stakersunion.com/admin',
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      subject: 'New Appeal',
    })
    callback()
  }

  useEffect(() => {
    if (updateSuccess && sendSuccess) {
      toast.success('Appeal submitted successfully')
    }
  }, [updateSuccess, sendSuccess])

  const method = form.watch('method')

  if (loadingProfile) {
    return <Skeleton className={'h-[400px]'} />
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'space-y-8 mb-10'}
      >
        <div className={'flex'}>
          <FormField
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <FormItem className={'flex-1'}>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'Email'}
                    {...field}
                  />
                </FormControl>
                <div className={'flex'}>
                  <FormDescription className={'text-xs'}>
                    The email associated with your account.
                  </FormDescription>
                  <FormMessage className={'ml-2 text-xs text-red-500'} />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          <FormField
            control={form.control}
            name={'address'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'0x...'}
                    {...field}
                  />
                </FormControl>
                <div className={'flex'}>
                  <FormDescription className={'text-xs'}>
                    The ETH address you are submitting for review.
                  </FormDescription>
                  <FormMessage className={'ml-2 text-xs text-red-500'} />
                </div>
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
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={'Select...'} />
                    </SelectTrigger>
                    <SelectContent>
                      {addressTypes.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className={'flex'}>
                  <FormDescription className={'text-xs'}>The type of address.</FormDescription>
                  <FormMessage className={'ml-2 text-xs text-red-500'} />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          <FormField
            control={form.control}
            name={'method'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Method</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={'Select...'} />
                    </SelectTrigger>
                    <SelectContent>
                      {stakingMethods.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className={'flex'}>
                  <FormDescription className={'text-xs'}>Your staking method.</FormDescription>
                  <FormMessage className={'ml-2 text-xs text-red-500'} />
                </div>
              </FormItem>
            )}
          />
          {method === 'other' && (
            <FormField
              control={form.control}
              name={'otherMethod'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Staking Method</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <div className={'flex'}>
                    <FormDescription className={'text-xs'}>
                      Enter the other staking method.
                    </FormDescription>
                    <FormMessage className={'ml-2 text-xs text-red-500'} />
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>
        <div className={'flex'}>
          <FormField
            control={form.control}
            name={'rationale'}
            render={({ field }) => (
              <FormItem className={'flex flex-1 flex-col'}>
                <FormLabel>Rationale</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={'Enter your rationale...'}
                    className={'flex flex-1 w-full h-32'}
                    {...field}
                  />
                </FormControl>
                <div className={'flex'}>
                  <FormDescription className={'text-xs'}>
                    Your rationale for the appeal. Describe your staking setup and anything else
                    that you think could help. This will be shared with verified members during your
                    appeal review.
                  </FormDescription>
                  <FormMessage className={'ml-2 text-xs text-red-500'} />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className={'flex'}>
          <div className={'flex flex-1'}>
            <Button
              disabled={updatePending || sendPending}
              type={'submit'}
            >
              {updatePending ||
                (sendPending && (
                  <FontAwesomeIcon
                    icon={faLoader}
                    className={'mr-2 h-4 w-4 animate-spin'}
                  />
                ))}
              {submitText}
            </Button>
          </div>
          {extraActions}
        </div>
      </form>
    </Form>
  )
}

export default AppealForm
