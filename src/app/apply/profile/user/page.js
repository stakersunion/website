'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAddress } from 'ethers'
import { useForm } from 'react-hook-form'
import { User } from '@/components/user/profile/forms'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const allowedContactMethods = ['email', 'discord', 'telegram', 'signal', 'whatsapp']

const getDefaultValues = () => ({
  name: '',
  email: '',
  discord: '',
  withdrawalAddress: '',
  languages: {
    common: [],
    custom: [],
  },
  preferredContact: {
    methods: [],
    handles: {
      telegram: '',
      signal: '',
      whatsapp: '',
    },
  },
  stack: {
    os: '',
    osOther: '',
    tooling: [],
    toolingCustom: [],
  },
})

const buildFormValues = (profile) => {
  const baseValues = getDefaultValues()
  if (!profile) return baseValues

  const storedMethods = (profile.preferredContact?.methods || []).filter((method) =>
    allowedContactMethods.includes(method)
  )
  const inferredMethods = []
  if (profile.email?.trim()) inferredMethods.push('email')
  if (profile.discord?.trim()) inferredMethods.push('discord')

  return {
    ...baseValues,
    ...profile,
    languages: {
      ...baseValues.languages,
      ...(profile.languages || {}),
      common: profile.languages?.common || [],
      custom: profile.languages?.custom || [],
    },
    preferredContact: {
      ...baseValues.preferredContact,
      ...(profile.preferredContact || {}),
      methods: storedMethods.length > 0 ? storedMethods : inferredMethods,
      handles: {
        ...baseValues.preferredContact.handles,
        ...(profile.preferredContact?.handles || {}),
      },
    },
    stack: {
      ...baseValues.stack,
      ...(profile.stack || {}),
      tooling: profile.stack?.tooling || [],
      toolingCustom: profile.stack?.toolingCustom || [],
    },
  }
}

const ApplyProfileUser = () => {
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending, isSuccess } = useUpdateProfile()
  const router = useRouter()
  const formSchema = z
    .object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      discord: z.string().optional(),
      withdrawalAddress: z
        .string()
        .optional()
        .refine((value) => (value ? isAddress(value) : true), {
          message: 'The provided ETH address is invalid.',
        }),
      languages: z
        .object({
          common: z.array(z.string()).optional(),
          custom: z.array(z.string()).optional(),
        })
        .optional(),
      preferredContact: z
        .object({
          methods: z.array(z.string()).optional(),
          handles: z
            .object({
              telegram: z.string().optional(),
              signal: z.string().optional(),
              whatsapp: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      stack: z
        .object({
          os: z.string().optional(),
          osOther: z.string().optional(),
          tooling: z.array(z.string()).optional(),
          toolingCustom: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .superRefine((data, ctx) => {
      const methods = data.preferredContact?.methods || []
      const handles = data.preferredContact?.handles || {}

      if (methods.includes('email') && !data.email?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Email is required when Email is a preferred contact method.',
          path: ['email'],
        })
      }

      if (methods.includes('discord') && !data.discord?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Discord is required when Discord is a preferred contact method.',
          path: ['discord'],
        })
      }

      if (methods.includes('telegram') && !handles.telegram?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Telegram handle is required when Telegram is selected.',
          path: ['preferredContact', 'handles', 'telegram'],
        })
      }

      if (methods.includes('signal') && !handles.signal?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Signal detail is required when Signal is selected.',
          path: ['preferredContact', 'handles', 'signal'],
        })
      }

      if (methods.includes('whatsapp') && !handles.whatsapp?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'WhatsApp detail is required when WhatsApp is selected.',
          path: ['preferredContact', 'handles', 'whatsapp'],
        })
      }
    })

  const values = useMemo(() => buildFormValues(profile), [profile])
  const defaultValues = useMemo(() => getDefaultValues(), [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    values,
  })

  const onSubmit = async (values) => {
    await updateProfile(values)
    router.push(routes.apply.children.profile.children.validator.path)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('User information updated successfully, redirecting...')
    }
  }, [isSuccess])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <User
          form={form}
          isLoading={isLoading}
        />

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
              Save & Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ApplyProfileUser
