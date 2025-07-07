import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { cn } from '@/utils/shadcn'
import { useVerification } from '@/utils/query/user/verification'

const Method = ({ method, setMethod }) => {
  const { data: verification } = useVerification()

  const toggleMethod = (newMethod) => {
    if (newMethod === method) {
      setMethod(null)
    } else {
      setMethod(newMethod)
    }
  }

  // If the user has already scheduled a verification, don't show the method selection
  if (verification?.independent?.schedule) return null

  return (
    <div>
      <h2 className={'text-2xl font-bold'}>Select a method</h2>
      <div className={'grid grid-cols-2 gap-4 my-4'}>
        <Card
          className={cn(
            'hover:bg-black hover:border-white transition-all cursor-pointer',
            method === 'other' && 'bg-black border-white'
          )}
          onClick={() => toggleMethod('other')}
        >
          <CardHeader>
            <CardTitle className={'flex items-center'}>
              <FontAwesomeIcon
                icon={faServer}
                className={'mr-3 w-5 h-5'}
              />
              Other
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Select a time window to disable attestations and complete verification</p>
          </CardContent>
        </Card>
        <Card
          className={cn(
            'group hover:bg-black hover:border-white transition-all cursor-pointer',
            method === 'dappnode' && 'bg-black border-white'
          )}
          onClick={() => toggleMethod('dappnode')}
        >
          <CardHeader>
            <CardTitle className={'flex items-center'}>
              <Image
                src={'/icons/dappnode.png'}
                alt={'DAppNode Logo'}
                width={25}
                height={25}
                className={cn(
                  'mr-3 grayscale group-hover:grayscale-0',
                  method === 'dappnode' && 'grayscale-0'
                )}
              />
              DAppNode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get verified by running the Stakers Union Verification DApp on your DAppNode</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Method
