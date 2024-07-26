import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faCalendar,
  faImage,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import createEvent from '@/utils/ics'

const Value = ({ step, id }) => {
  switch (step.key) {
    case 'eligibility':
      if (!step.signature) return null
      return (
        <Link
          href={step.signature}
          target={'_blank'}
        >
          <Button
            variant={'secondary'}
            size={'sm'}
          >
            Open
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className={'w-3 h-3 ml-2'}
            />
          </Button>
        </Link>
      )
    case 'independent':
      if (!step.schedule) return null
      return (
        <div>
          <Link
            href={'#'}
            onClick={() =>
              createEvent({
                time: step.schedule,
                title: 'Proof of Independent Operation Scheduled',
                description: `User ${id} is scheduled to disable attestations for verification of independent operation of their validator.`,
              })
            }
          >
            <Button
              variant={'secondary'}
              size={'sm'}
            >
              {step.schedule && new Date(step.schedule).toLocaleString()}
              <FontAwesomeIcon
                icon={faCalendar}
                className={'w-3 h-3 ml-2'}
              />
            </Button>
          </Link>
        </div>
      )
    case 'residential':
      if (!step.photo) return null
      return (
        <Link
          href={step.photo}
          target={'_blank'}
        >
          <Button
            variant={'secondary'}
            size={'sm'}
          >
            View
            <FontAwesomeIcon
              icon={faImage}
              className={'w-3 h-3 ml-2'}
            />
          </Button>
        </Link>
      )
    default:
      return null
  }
}

export default Value
