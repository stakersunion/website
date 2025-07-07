'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleInfo } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'

const DAppNode = () => {
  const queryClient = useQueryClient()
  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['user', 'verification'] })
  }

  return (
    <div>
      <Alert>
        <FontAwesomeIcon icon={faFileCircleInfo} />
        <div className={'flex flex-wrap items-center'}>
          <div className={'ml-1 mt-1 mr-6 flex-1'}>
            <AlertTitle>Instructions</AlertTitle>
            <AlertDescription>
              <ol className={'mt-2 ml-4 list-decimal'}>
                <li>Download and install the Stakers Union Verification DApp on your DAppNode</li>
                <li>Enter your eligible address during installation</li>
                <li>
                  Launch the{' '}
                  <Link
                    target={'_blank'}
                    className={'underline underline-offset-2 hover:no-underline'}
                    href={'http://stakersunion.stakersunion.public.dappnode/'}
                  >
                    DAppNode Verification UI
                  </Link>{' '}
                  to submit your verification
                </li>
                <li>Refresh this page to track your verification status</li>
              </ol>
            </AlertDescription>
          </div>
          <div className={'flex flex-col gap-4'}>
            <Link
              target={'_blank'}
              href={process.env.NEXT_PUBLIC_DAPPNODE_PACKAGE}
            >
              <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Install Package</Button>
            </Link>
            <Button
              variant={'secondary'}
              onClick={handleRefetch}
            >
              Refresh
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  )
}

export default DAppNode
