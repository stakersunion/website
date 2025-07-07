import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleInfo } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ScheduleForm } from '@/components/apply'

const Schedule = () => {
  return (
    <div>
      <Alert>
        <FontAwesomeIcon icon={faFileCircleInfo} />
        <div className={'flex flex-wrap items-center'}>
          <div className={'ml-1 mt-1 mr-6 flex-1'}>
            <AlertTitle>Instructions</AlertTitle>
            <AlertDescription>
              <ol className={'mt-2 ml-4 list-decimal'}>
                <li>Select a date/time from the options below to complete verification</li>
                <li>
                  Temporarily disable attestations at the scheduled time (minimum 2, maximum 10)
                </li>
                <li>
                  You will only have two opportunities to complete verification of independent
                  operation
                </li>
              </ol>
            </AlertDescription>
          </div>
          <Link
            target={'_blank'}
            href={
              'https://docs.stakersunion.com/membership/verification#proof-of-independent-operation'
            }
          >
            <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Read More</Button>
          </Link>
        </div>
      </Alert>
      <ScheduleForm />
    </div>
  )
}

export default Schedule
