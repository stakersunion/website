'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleInfo } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useUser } from '@/utils/query/user'
import { useUpdateSchedule } from '@/utils/query/user/addresses'
import { generateSchedule, getCurrentTimezone } from '@/utils/schedule'
import { routes } from '@/utils/routes'

const ApplyIndependent = () => {
  const router = useRouter()
  const { data: user, isLoading } = useUser()
  const { mutateAsync: updateSchedule } = useUpdateSchedule()
  const [selectedDate, setSelectedDate] = useState(null)
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    setSchedule(generateSchedule())
  }, [])

  if (isLoading) {
    return <Skeleton className={'h-[400px]'} />
  }

  if (user.addresses.some((address) => address.status === 'submitted')) {
    router.push(routes.apply.children.eligibility.path)
  }

  const handleChange = (value) => {
    setSelectedDate(value)
  }

  const handleSubmit = async (value) => {
    console.log(value)
    const date = new Date(value)
    const convertedDate = date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    await updateSchedule({ schedule: convertedDate })
  }

  return (
    <div>
      <Alert>
        <FontAwesomeIcon icon={faFileCircleInfo} />
        <div className={'flex flex-wrap items-center'}>
          <div className={'ml-1 mt-1 mr-2 flex-1'}>
            <AlertTitle>Instructions</AlertTitle>
            <AlertDescription>
              <ol className={'mt-2 ml-4 list-decimal'}>
                <li>Select a date/time from the options below to complete verification</li>
                <li>
                  Temporarily disable attestations at the scheduled time (2 attestations minimum)
                </li>
                <li>
                  You will only have one opportunity to complete verification of independent
                  operation
                </li>
              </ol>
            </AlertDescription>
          </div>
          <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Detailed Instructions</Button>
        </div>
      </Alert>
      <Card className={'my-6'}>
        <CardHeader>
          <CardTitle>Verification Schedule</CardTitle>
          <CardDescription>
            Please select a date and time from the options above to complete verification. Times are
            in the local timezone detected by your browser: {getCurrentTimezone()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion
            type={'single'}
            collapsible
            className={'w-full'}
            defaultValue={'item-0'}
          >
            {schedule.map((date, index) => {
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                >
                  <AccordionTrigger>
                    {new Date(date.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ToggleGroup
                      type={'single'}
                      onValueChange={handleChange}
                    >
                      <div className={'w-full grid grid-cols-2 gap-4'}>
                        {date.times.map((time, timeIndex) => {
                          return (
                            <ToggleGroupItem
                              type={'single'}
                              key={timeIndex}
                              className={'w-full'}
                              variant={'ghost'}
                              value={time}
                            >
                              {new Date(time).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                              })}
                            </ToggleGroupItem>
                          )
                        })}
                      </div>
                    </ToggleGroup>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSubmit(selectedDate)}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ApplyIndependent
