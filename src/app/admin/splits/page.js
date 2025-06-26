'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSplitsMetadata } from '@/utils/query/admin/splits'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { EthAddress } from '@/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmptySet } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/light'
import { chains } from '@/utils/chains'

const Splits = () => {
  const { data, isLoading } = useSplitsMetadata()
  const [chain, setChain] = useState('gnosis')

  if (isLoading) {
    return <Skeleton className={'h-[400px]'} />
  }

  return (
    <div className={'flex flex-col gap-6 pb-10'}>
      <Card className={'h-full'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
          <CardTitle>Chain</CardTitle>
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
        <CardContent>
          {data[chain] ? (
            <div
              key={chain}
              className={'flex flex-row gap-10'}
            >
              <div>
                <p className={'font-semibold text-muted-foreground'}>Type:</p>
                <p className={'capitalize'}>{data[chain].type}</p>
              </div>
              <div className={'flex flex-1 flex-col'}>
                <p className={'font-semibold text-muted-foreground'}>Address:</p>
                <EthAddress address={data[chain].address} />
              </div>
              <Link
                href={`https://app.splits.org/accounts/${data[chain].address}?chainId=${chains[chain].id}`}
                target={'_blank'}
              >
                <Button>View on Splits</Button>
              </Link>
            </div>
          ) : (
            <p className={'text-sm text-muted-foreground'}>No data available for this chain.</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current Recipients</CardTitle>
        </CardHeader>
        <CardContent>
          {data[chain] ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead className={'text-right'}>Percent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data[chain].recipients.map((recipient) => (
                  <TableRow key={recipient.recipient.address}>
                    <TableCell>
                      <EthAddress
                        address={recipient.recipient.address}
                        length={0}
                      />
                    </TableCell>
                    <TableCell className={'text-right'}>
                      {recipient.percentAllocation.toFixed(4)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell className={'text-right'}>100%</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead className={'text-right'}>Percent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className={'h-24 text-center'}
                  >
                    <FontAwesomeIcon
                      icon={faEmptySet}
                      size={'2x'}
                      className={'mb-2'}
                    />
                    <p>No recipients found</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <Link href={'/admin/splits/update'}>
            <Button>Update</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Splits
