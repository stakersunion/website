'use client'

import Link from 'next/link'
import { useSplitsMetadata } from '@/utils/query/admin/splits'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
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

const Splits = () => {
  const { data, isLoading } = useSplitsMetadata()

  if (isLoading) {
    return <Skeleton className={'h-[400px]'} />
  }

  return (
    <div className={'flex flex-col gap-6 pb-10'}>
      <Card className={'h-full'}>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={'flex flex-row gap-10'}>
            <div>
              <p className={'font-semibold text-muted-foreground'}>Type:</p>
              <p>{data.type}</p>
            </div>
            <div className={'flex flex-1 flex-col'}>
              <p className={'font-semibold text-muted-foreground'}>Address:</p>
              <EthAddress
                address={data.address}
                length={0}
              />
            </div>
            <Link
              href={`https://app.splits.org/accounts/${data.address}?chainId=${process.env.NEXT_PUBLIC_CHAIN_ID}`}
              target={'_blank'}
            >
              <Button>View on Splits</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current Recipients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead className={'text-right'}>Percent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recipients.map((recipient) => (
                <TableRow key={recipient.recipient.address}>
                  <TableCell>
                    <EthAddress
                      address={recipient.recipient.address}
                      length={0}
                    />
                  </TableCell>
                  <TableCell className={'text-right'}>{recipient.percentAllocation.toFixed(4)}%</TableCell>
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
