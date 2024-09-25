import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useFormContext } from 'react-hook-form'
import { EthAddress } from '@/components'
import { Add } from '@/components/user/addresses'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faRefresh } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { faEmptySet } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/light'
import { useAddresses } from '@/utils/query/user/address'
import { useSubmitPassport, useScorer } from '@/utils/query/user/scorer'
import { cn } from '@/utils/shadcn'

const Address = ({ address }) => {
  const { mutateAsync: submitPassport, isPending: loadingPassport } = useSubmitPassport()
  const {
    data: score,
    isLoading: refreshingPassport,
    refetch: refreshPassport,
    isSuccess: passportRefreshed,
  } = useScorer({
    address: address.address,
  })
  const { watch, setValue } = useFormContext()

  const selectedAddress = watch('passportAddress')

  const handleSelectAddress = () => {
    setValue('passportAddress', address.address)
  }

  const handleRefreshPassport = () => {
    refreshPassport()
  }

  console.log(passportRefreshed)
  const handleSubmitPassport = async () => {
    await submitPassport({ address: address.address })
  }

  return (
    <div
      className={cn(
        'flex flex-col relative border border-muted rounded-lg p-4',
        selectedAddress === address.address && 'border-white'
      )}
    >
      <h3 className={'text-muted-foreground text-xs font-semibold tracking-wider'}>
        {address.type.toUpperCase()}
      </h3>
      <EthAddress
        address={address.address}
        className={'text-lg'}
        clipboard={false}
      />
      {address.passport && (
        <div>
          <p className={'text-4xl font-bold my-2 flex flex-1 items-start'}>
            {Math.round(address.passport?.score)}
          </p>
          <p className={'text-xs flex flex-1 items-end'}>
            Expires:{' '}
            {address.passport?.expires ? new Date(address.passport?.expires).toDateString() : 'N/A'}
          </p>
        </div>
      )}
      {address.passport ? (
        <div className={'flex flex-1 mt-4 items-end'}>
          <Button
            size={'sm'}
            type={'button'}
            className={'mr-2'}
            variant={'secondary'}
            onClick={handleRefreshPassport}
            disabled={refreshingPassport || passportRefreshed}
          >
            <FontAwesomeIcon
              icon={faRefresh}
              className={cn(refreshingPassport && 'animate-spin')}
            />
          </Button>
          <Button
            size={'sm'}
            type={'button'}
            className={'flex-1'}
            onClick={handleSelectAddress}
          >
            Select
          </Button>
        </div>
      ) : (
        <div className={'flex flex-1 mt-4 items-end'}>
          <Button
            className={'w-full'}
            size={'sm'}
            onClick={handleSubmitPassport}
            disabled={loadingPassport}
            type={'button'}
          >
            {loadingPassport && (
              <FontAwesomeIcon
                icon={faLoader}
                className={'animate-spin mr-2'}
              />
            )}
            Load Passport Score
          </Button>
        </div>
      )}
    </div>
  )
}

const Passport = () => {
  const { data: addresses, isLoading: loadingAddresses } = useAddresses()

  if (loadingAddresses) {
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
      <div className={'flex flex-col justify-center items-center border border-dashed border-muted rounded-lg p-16'}>
        <FontAwesomeIcon icon={faEmptySet} className={'text-4xl text-muted-foreground'} />
        <p className={'text-lg text-muted-foreground mt-4'}>No addresses found</p>
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

export default Passport
