import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AddressForm } from '@/components/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleInfo } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const ApplyAddresses = () => {
  return (
    <div>
      <Alert>
        <FontAwesomeIcon icon={faFileCircleInfo} />
        <div className={'flex flex-wrap items-center'}>
          <div className={'ml-1 mt-1 mr-2 flex-1'}>
            <AlertTitle>Instructions</AlertTitle>
            <AlertDescription>
              <ol className={'mt-2 ml-4 list-decimal'}>
                <li>Ensure that your address is on StakeCat List A</li>
                <li>Sign a message containing the Stakers Union Oath</li>
                <li>Submit a link to an Etherscan verified signature</li>
              </ol>
            </AlertDescription>
          </div>
          <Button className={'mt-2 sm:mt-0 sm:w-auto w-full'}>Detailed Instructions</Button>
        </div>
      </Alert>
      <div className={'my-6'}>
        <AddressForm />
      </div>
    </div>
  )
}

export default ApplyAddresses
