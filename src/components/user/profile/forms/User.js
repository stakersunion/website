'use client'

import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const User = ({ form, isLoading }) => {
  return (
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
                <FormDescription className={'text-xs'}>Your public display name.</FormDescription>
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
                  Your preferred contact email used for notifications. Use an anonymous service!
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
  )
}

export default User
