'use client'

import { useEffect } from 'react'
import { Title } from '@/components'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faShieldCheck } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const availabilityOptions = [
  {
    key: 'dvt',
    label: 'DVT Clustering',
    description:
      'I am available to participate in distributed validator clusters using Obol or SSV Network.',
  },
  {
    key: 'avs',
    label: 'AVS Operation',
    description:
      'I am available to operate Actively Validated Services (AVS) on EigenLayer or similar protocols.',
  },
  {
    key: 'clientTesting',
    label: 'Client Testing',
    description:
      'I am willing to test minority or new Ethereum clients to help improve client diversity.',
  },
  {
    key: 'preconf',
    label: 'Preconfirmations',
    description:
      'I am interested in participating in preconfirmation protocols when they become available.',
  },
]

const formSchema = z.object({
  availability: z.object({
    dvt: z.boolean().default(false),
    avs: z.boolean().default(false),
    clientTesting: z.boolean().default(false),
    preconf: z.boolean().default(false),
  }),
})

const Availability = () => {
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending, isSuccess } = useUpdateProfile()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availability: {
        dvt: false,
        avs: false,
        clientTesting: false,
        preconf: false,
      },
    },
  })

  // Update form values when profile loads
  useEffect(() => {
    if (profile?.availability) {
      form.reset({
        availability: {
          dvt: profile.availability.dvt || false,
          avs: profile.availability.avs || false,
          clientTesting: profile.availability.clientTesting || false,
          preconf: profile.availability.preconf || false,
        },
      })
    }
  }, [profile, form])

  const onSubmit = async (values) => {
    await updateProfile(values)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Availability preferences updated')
    }
  }, [isSuccess])

  return (
    <div className="container max-w-2xl">
      <Title>Operator Availability</Title>
      <p className="text-muted-foreground">
        Signal your availability for different operator functions. This information is displayed
        publicly on the Union dashboard to help protocols find available operators.
      </p>
      <Separator className="my-6" />

      {isLoading ? (
        <Skeleton className="h-96" />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faShieldCheck} className="h-5 w-5" />
                  Availability Signals
                </CardTitle>
                <CardDescription>
                  Enable the signals below to indicate your interest and availability. Protocols
                  looking for operators can see aggregate counts on our public dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {availabilityOptions.map((option) => (
                  <FormField
                    key={option.key}
                    control={form.control}
                    name={`availability.${option.key}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">{option.label}</FormLabel>
                          <FormDescription>{option.description}</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <FontAwesomeIcon icon={faLoader} className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Preferences
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default Availability
