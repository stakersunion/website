import { useState } from 'react'
import { createEvent } from 'ics'
import { useVerification } from '@/utils/query/user/verification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLoader, faWarning } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { Button } from '@/components/ui/button'

const CalendarFile = () => {
  const { data: verification, isLoading: loadingVerification } = useVerification()
  const [error, setError] = useState(null)

  const event = {
    duration: { minutes: 30 },
    title: 'Proof of Independent Operation',
    description:
      'You are scheduled to disable attestations for verification of independent operation of your validator.',
    location: 'Ethererum Mainnet',
    url: 'https://members.stakersunion.com',
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'Me', email: 'thame@stakersunion.com' },
  }

  const dateToICSFormat = () => {
    let date = new Date(verification.independent.schedule)
    return [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ]
  }

  const handleDownload = () => {
    if (!verification.independent.schedule) {
      return setError('No schedule found')
    }

    event.start = dateToICSFormat()

    createEvent(event, (error, value) => {
      if (error) {
        setError(error)
        return
      }

      const blob = new Blob([value], { type: 'text/calendar' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'event.ics'
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  if (loadingVerification) {
    return (
      <Button>
        <FontAwesomeIcon
          icon={faLoader}
          className={'mr-2 animate-spin'}
        />
        Loading
      </Button>
    )
  }
  if (error) {
    return (
      <Button
        disabled={true}
        variant={'destructive'}
      >
        <FontAwesomeIcon
          icon={faWarning}
          className={'mr-2'}
        />
        Error
      </Button>
    )
  }
  return (
    <Button onClick={handleDownload}>
      <FontAwesomeIcon
        icon={faCalendar}
        className={'mr-2'}
      />
      Add to Calendar
    </Button>
  )
}

export default CalendarFile
