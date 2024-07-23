import { useState } from 'react'
import createEvent from '@/utils/ics'
import { useVerification } from '@/utils/query/user/verification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLoader, faWarning } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { Button } from '@/components/ui/button'

const CalendarFile = () => {
  const { data: verification, isLoading: loadingVerification } = useVerification()
  const [error, setError] = useState(null)

  const handleDownload = () => {
    if (!verification.independent.schedule) {
      return setError('No schedule found')
    }

    createEvent({
      time: verification.independent.schedule,
      title: 'Proof of Independent Operation',
      description:
        'You are scheduled to disable attestations for verification of independent operation of your validator.',
      setError,
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
    <Button onClick={handleDownload} variant={'secondary'}>
      <FontAwesomeIcon
        icon={faCalendar}
        className={'mr-2'}
      />
      Add to Calendar
    </Button>
  )
}

export default CalendarFile
