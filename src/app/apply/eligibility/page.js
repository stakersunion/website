'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Status, SignatureForm } from '@/components/apply'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleInfo } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const ApplyEligibility = () => {
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
                    <li>
                      Ensure that your address is on{' '}
                      <Link
                        target={'_blank'}
                        className={'underline underline-offset-2 hover:no-underline'}
                        href={'https://www.stakecat.space/solo-stakers'}
                      >
                        StakeCat List A
                      </Link>{' '}
                      or{' '}
                      <Link
                        target={'_blank'}
                        className={'underline underline-offset-2 hover:no-underline'}
                        href={
                          'https://github.com/Stake-Cat/Solo-Stakers/blob/main/Solo-Stakers/Rocketpool-Solo-Stakers.csv'
                        }
                      >
                        StakeCat RocketPool
                      </Link>{' '}
                      list.
                    </li>
                    <li>
                      <Link
                        target={'_blank'}
                        className={'underline underline-offset-2 hover:no-underline'}
                        href={'https://docs.stakersunion.com/membership/verification/signing'}
                      >
                        Sign a message
                      </Link>{' '}
                      containing the Stakers Union Oath
                    </li>
                    <li>
                      Submit the URL of your{' '}
                      <Link
                        target={'_blank'}
                        className={'underline underline-offset-2 hover:no-underline'}
                        href={'https://etherscan.io/verifiedSignatures#'}
                      >
                        Etherscan Verified Signature
                      </Link>
                    </li>
                  </ol>
                </AlertDescription>
              </div>
              <Link
                target={'_blank'}
                href={'https://docs.stakersunion.com/membership/verification#proof-of-eligibility'}
              >
                <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Read More</Button>
              </Link>
            </div>
          </Alert>
          <div className={'my-6'}>
            <SignatureForm submitText={'Save and Continue'} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ApplyEligibility
