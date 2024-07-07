'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { EthAddress } from '@/components'
import { AddAddress, RemoveAddress } from '@/components/admin/user'
import { useAddresses } from '@/utils/query/admin/user/addresses'
import { routes, getRoute } from '@/utils/routes'

const Addresses = ({ id }) => {
  const { data: addresses, isLoading: loadingUser } = useAddresses({ id })

  if (loadingUser) {
    return <Skeleton className={'w-full h-96'} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Addresses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={'rounded-md border'}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addresses.map((address) => {
                return (
                  <TableRow key={address.address}>
                    <TableCell>
                      <Link
                        href={getRoute({
                          path: routes.admin.children.address.path,
                          params: { id, address: address.address },
                        })}
                      >
                        <EthAddress address={address.address} />
                      </Link>
                    </TableCell>
                    <TableCell>{address.type}</TableCell>
                    <TableCell className={'flex gap-x-2'}>
                      <RemoveAddress
                        id={id}
                        address={address.address}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <AddAddress id={id} />
      </CardFooter>
    </Card>
  )
}

export default Addresses
