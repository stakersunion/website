'use client'

import { useEffect, useState } from 'react'
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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useUpdateVerification } from '@/utils/query/user/verification'
import { generateSchedule, getCurrentTimezone } from '@/utils/schedule'

const ScheduleForm = ({ callback = () => {}, submitText = 'Schedule' }) => {
  const { mutateAsync: updateVerification, isPending } = useUpdateVerification()
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    setSchedule(generateSchedule())
  }, [])

  const formSchema = z.object({
    schedule: z.date({ message: 'Please select a date' }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schedule: '',
    },
  })

  const handleSelect = (value) => {
    form.setValue('schedule', value)
  }

  const handleSubmit = async ({ schedule }) => {
    const date = new Date(schedule)
    const convertedDate = date.toISOString()
    await updateVerification({ schedule: convertedDate })
    callback()
  }

  return (
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
                    onValueChange={handleSelect}
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
        <Button
          disabled={isPending}
          onClick={form.handleSubmit(handleSubmit)}
        >
          {isPending && (
            <FontAwesomeIcon
              icon={faLoader}
              className={'mr-2 h-4 w-4 animate-spin'}
            />
          )}
          {submitText}
        </Button>
        <div className={'text-sm ml-4 text-muted-foreground'}>
          {form.formState.errors.schedule?.message}
        </div>
      </CardFooter>
    </Card>
  )
}

export default ScheduleForm
