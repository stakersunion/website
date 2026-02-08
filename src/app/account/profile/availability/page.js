'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { useProfile, useUpdateProfile } from '@/utils/query/user/profile'
import { availabilityOptions, defaultAvailability } from '@/utils/availability'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import {
  FlaskConical,
  GraduationCap,
  Network,
  PlugZap,
  RadioTower,
  Rocket,
  ShieldAlert,
  TestTube2,
} from 'lucide-react'

const availabilityIcons = {
  dvt: Network,
  avs: Rocket,
  clientTesting: TestTube2,
  preconf: RadioTower,
  testnet: FlaskConical,
  mevRelay: PlugZap,
  incidentResponse: ShieldAlert,
  mentorship: GraduationCap,
}

const Availability = () => {
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending, isSuccess } = useUpdateProfile()
  const [availability, setAvailability] = useState({ ...defaultAvailability })

  useEffect(() => {
    if (profile) {
      const nextAvailability = profile.availability
        ? { ...defaultAvailability, ...profile.availability }
        : { ...defaultAvailability }
      setAvailability(nextAvailability)
    }
  }, [profile])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Availability updated successfully')
    }
  }, [isSuccess])

  const handleToggle = (key, checked) => {
    setAvailability((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSave = async () => {
    await updateProfile({ availability })
  }

  if (isLoading) {
    return <Skeleton className={'h-[320px]'} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Signals</CardTitle>
        <CardDescription>
          If you opt in, the Stakers Union team may reach out for participation opportunities.
          Signals are only shared publicly as aggregate counts on the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className={'grid grid-cols-1 gap-4 md:grid-cols-2'}>
        {availabilityOptions.map((option) => {
          const Icon = availabilityIcons[option.key]
          return (
            <div
              key={option.key}
              className={'group rounded-lg border p-4 transition-colors hover:bg-accent/40'}
            >
              <div className={'flex items-start justify-between gap-3'}>
                <div className={'flex items-start gap-3'}>
                  <div className={'rounded-md border bg-background p-2 text-muted-foreground'}>
                    {Icon ? <Icon className={'h-4 w-4'} /> : null}
                  </div>
                  <div>
                    <p className={'font-medium leading-tight'}>{option.title}</p>
                    <p className={'mt-1 text-sm text-muted-foreground'}>{option.description}</p>
                  </div>
                </div>
                <Switch
                  checked={Boolean(availability[option.key])}
                  onCheckedChange={(checked) => handleToggle(option.key, checked)}
                />
              </div>
              <div className={'mt-3 flex items-center justify-between'}>
                {availability[option.key] ? (
                  <Badge className={'border-slate-300 bg-white text-slate-900 hover:bg-white'}>
                    Opted In
                  </Badge>
                ) : (
                  <Badge
                    variant={'outline'}
                    className={'bg-background text-muted-foreground'}
                  >
                    Not Opted In
                  </Badge>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
      <CardFooter className={'justify-end'}>
        <Button
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending && (
            <FontAwesomeIcon
              icon={faLoader}
              className={'mr-2 h-4 w-4 animate-spin'}
            />
          )}
          Save
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Availability
