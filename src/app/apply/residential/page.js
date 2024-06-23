'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleInfo } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { Status, PhotoForm } from '@/components/apply'

const ApplyResidential = () => {
  const [replace, setReplace] = useState(true)

  return (
    <div>
      <Status setReplace={setReplace} />
      {!replace && (
        <div>
          <Alert>
            <FontAwesomeIcon icon={faFileCircleInfo} />
            <div className={'flex flex-wrap items-center'}>
              <div className={'ml-1 mt-1 mr-6 flex-1'}>
                <AlertTitle>Instructions</AlertTitle>
                <AlertDescription>
                  <ol className={'mt-2 ml-4 list-decimal'}>
                    <li>The hardware should be clearly visible.</li>
                    <li>
                      An international newspaper front page or a printout of a news website must be
                      included, with the text "Stakers Union" visibly written on it.
                    </li>
                  </ol>
                </AlertDescription>
              </div>
              <Link
                target={'_blank'}
                href={
                  'https://docs.stakersunion.com/membership/verification#proof-of-residential-operation'
                }
              >
                <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Read More</Button>
              </Link>
            </div>
          </Alert>
          <PhotoForm />
        </div>
      )}
    </div>
  )
}

export default ApplyResidential
