'use client'

import { useMemo } from 'react'
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
import { useCheckEligibility } from '@/utils/query/user/eligibility'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const SignatureForm = ({ callback = () => {}, submitText = 'Submit', extraActions = null }) => {
  const {
    mutateAsync: updateVerification,
    isPending: pendingUpdateVerification,
    isSuccess: successUpdateVerification,
    error,
  } = useUpdateVerification()
  const {
    mutateAsync: checkEligibility,
    isPending: pendingCheckEligibility,
    isSuccess: successCheckEligibility,
  } = useCheckEligibility()

  const isPending = useMemo(
    () => pendingUpdateVerification || pendingCheckEligibility,
    [pendingUpdateVerification, pendingCheckEligibility]
  )

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
    try {
      let updateResult = await updateVerification(values).catch((error) => ({ error }))
      let checkResult
      if (!('error' in updateResult)) {
        checkResult = await checkEligibility(values).catch((error) => ({ error }))
      }

      // Handle updateVerification result
      if ('error' in updateResult) {
        toast.error(`Submission failed: ${updateResult.error.message || 'Unknown error'}`)
        return 
      } else if (updateResult.data) {
        toast.success('Address submitted successfully')
      }

      // Handle checkEligibility result
      if ('error' in checkResult) {
        toast.error(
          `Automatic verification failed: ${checkResult.error.message || 'Unknown error'}`
        )
      } else if (Object.keys(checkResult).length === 0) {
        toast.error('Eligibility check did not return any data')
      } else {
        toast.success('Address verified successfully')
      }
    } catch (error) {
      toast.error(`An unexpected error occurred: ${error.message || 'Unknown error'}`)
    } finally {
      callback()
    }
  }

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
