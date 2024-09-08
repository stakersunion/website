import { useSplitsMetadata, useSplitsBalance } from '@/utils/query/splits'
import { Skeleton } from '@/components/ui/skeleton'

const Balances = () => {
  const { data: balances, isLoading } = useSplitsBalance()

  if (isLoading) {
    return <Skeleton className={'h-20'} />
  } else {
    let balance = balances.activeBalances['0x0000000000000000000000000000000000000000']
    return (
      <p>
        <span className={'text-6xl font-bold'}>{balance?.formattedAmount}</span>
        <span className={'text-sm font-bold'}>{balance?.symbol}</span>
      </p>
    )
  }
}

export default Balances
