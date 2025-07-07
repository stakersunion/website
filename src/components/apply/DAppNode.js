import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleInfo } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DAppNodeVerification } from '@/components/apply'

const DAppNode = () => {
  return (
    <div>
      <Alert>
        <FontAwesomeIcon icon={faFileCircleInfo} />
        <div className={'flex flex-wrap items-center'}>
          <div className={'ml-1 mt-1 mr-6 flex-1'}>
            <AlertTitle>Instructions</AlertTitle>
            <AlertDescription>
              <ol className={'mt-2 ml-4 list-decimal'}>
                <li>Download and install the DAppNode Verification DApp on your DAppNode</li>
                <li>Enter your eligible address during installation</li>
                <li>Launch the DAppNode Verification UI to submit your verification</li>
                <li>Return to this page to track your verification status</li>
              </ol>
            </AlertDescription>
          </div>
          <Link
            target={'_blank'}
            href={process.env.NEXT_PUBLIC_DAPPNODE_PACKAGE}
          >
            <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Install Package</Button>
          </Link>
        </div>
      </Alert>
      <DAppNodeVerification />
    </div>
  )
}

export default DAppNode
