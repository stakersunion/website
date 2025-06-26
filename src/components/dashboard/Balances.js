'use client'

import { useState, useMemo } from 'react'
import { useSplitsBalance } from '@/utils/query/splits'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { chains } from '@/utils/chains'

const Balances = () => {
  const [chain, setChain] = useState('gnosis')
  const { data: balances, isLoading } = useSplitsBalance()

  const activeBalancesByChain = useMemo(() => {
    if (balances?.[chain] && Object.keys(balances[chain].activeBalances).length > 0) {
      return Object.keys(balances[chain].activeBalances).map((key) => {
        return {
          address: key,
          symbol: balances[chain].activeBalances[key].symbol,
          formattedAmount: balances[chain].activeBalances[key].formattedAmount,
        }
      })
    } else {
      return [
        {
          address: '0x',
          symbol: '',
          formattedAmount: '0',
        },
      ]
    }
  }, [chain, isLoading])

  return (
    <Card>
      <CardHeader className={'flex flex-row justify-between'}>
        <div>
          <CardTitle>Current Funds</CardTitle>
          <CardDescription>Pending Distribution</CardDescription>
        </div>{' '}
        <Select
          value={chain}
          onValueChange={(value) => setChain(value)}
        >
          <SelectTrigger className={'w-[180px]'}>
            <SelectValue placeholder={'Chain'} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(chains).map((key) => (
              <SelectItem
                key={key}
                value={key}
                onSelect={() => setChain(key)}
              >
                {chains[key].title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className={'flex flex-col gap-y-4'}>
        {isLoading ? (
          <Skeleton className={'h-20'} />
        ) : (
          activeBalancesByChain.map((balance) => (
            <p key={balance.address}>
              <span className={'text-6xl font-bold'}>{balance.formattedAmount}</span>
              <span className={'text-sm font-bold'}>{balance.symbol}</span>
            </p>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default Balances
