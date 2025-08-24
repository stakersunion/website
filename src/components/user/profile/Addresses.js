import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Remove } from '@/components/user/addresses'
import { EthAddress } from '@/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { faEmptySet } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/light'
import { useAddresses } from '@/utils/query/user/address'
import { useSubmitScore } from '@/utils/query/user/scorer'
import { toast } from 'sonner'

const Address = ({ address }) => {
  const { mutateAsync: submitScore, data: score, isPending: loading } = useSubmitScore()

  const loadScore = async () => {
    try {
      await submitScore({ address: address.address })
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadScore()
  }, [])

  return (
    <div className={'flex flex-col relative border border-muted rounded-lg p-4'}>
      <h3 className={'text-muted-foreground text-xs font-semibold tracking-wider'}>
        {address.type.toUpperCase()}
      </h3>
      <EthAddress
        address={address.address}
        className={'text-lg'}
        clipboard={false}
      />
      {loading && (
        <div>
          <Skeleton className={'h-10 w-12 mt-4'} />
          <Skeleton className={'h-3 w-3/5 mt-3'} />
          <div className={'flex mt-4'}>
            <Skeleton className={'h-10 w-5/6'} />
            <Skeleton className={'h-10 w-1/6 ml-2'} />
          </div>
        </div>
      )}
      {score && (
        <div>
          <p className={'text-4xl font-bold my-2 flex flex-1 items-start'}>
            {Math.round(score?.score)}
          </p>
          <p className={'text-xs flex flex-1 items-end'}>
            Expires:{' '}
            {score?.expiration_date ? new Date(score?.expiration_date).toDateString() : 'N/A'}
          </p>
          <div className={'flex flex-1 mt-4 items-end'}>
            <Button
              className={'w-full'}
              size={'sm'}
              disabled={loading}
              onClick={loadScore}
              type={'button'}
            >
              {loading && (
                <FontAwesomeIcon
                  icon={faLoader}
                  className={'animate-spin mr-2'}
                />
              )}
              {loading ? 'Loading' : 'Refresh'}
            </Button>
            <Remove
              address={address.address}
              buttonClassName={'ml-2'}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const Addresses = () => {
  const { data: addresses, isLoading: loading } = useAddresses()

  if (loading) {
    return (
      <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
        <Skeleton className={'h-32'} />
        <Skeleton className={'h-32'} />
        <Skeleton className={'h-32'} />
      </div>
    )
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div
        className={
          'flex flex-col justify-center items-center border border-dashed border-muted rounded-lg p-16'
        }
      >
        <FontAwesomeIcon
          icon={faEmptySet}
          className={'text-4xl text-muted-foreground'}
        />
        <p className={'text-sm text-muted-foreground mt-4'}>No addresses found</p>
      </div>
    )
  }

  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
      {addresses.map((address) => (
        <Address
          key={address.address}
          address={address}
        />
      ))}
    </div>
  )
}

export default Addresses
