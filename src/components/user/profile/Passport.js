import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { EthAddress } from '@/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faRefresh } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { faEmptySet } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/light'
import { useScorer } from '@/utils/query/user/scorer'
import { cn } from '@/utils/shadcn'

const Address = ({ address }) => {
  const { mutateAsync: score, isPending: loadingScore } = useScorer()

  const loadScore = async () => {
    await score({ address: address.address })
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
            onClick={loadScore}
            disabled={loadingScore}
          >
            <FontAwesomeIcon
              icon={faRefresh}
              className={cn(loadingScore && 'animate-spin')}
            />
          </Button>
        </div>
      ) : (
        <div className={'flex flex-1 mt-4 items-end'}>
          <Button
            className={'w-full'}
            size={'sm'}
            onClick={handleSubmitPassport}
            disabled={loadingScore}
            type={'button'}
          >
            {loadingScore && (
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

const Passport = ({ addresses, loading }) => {
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
