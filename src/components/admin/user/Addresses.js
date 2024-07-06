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
import { AddAddress, RemoveAddress } from '@/components/admin/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
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
                  <TableCell>{address.address}</TableCell>
                  <TableCell>{address.type}</TableCell>
                  <TableCell className={'flex gap-x-2'}>
                    <Link
                      href={getRoute({
                        path: routes.admin.children.address.path,
                        params: { id, address: address.address },
                      })}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className={'text-muted-foreground hover:text-foreground'}
                      />
                    </Link>
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
      </CardContent>
      <CardFooter>
        <AddAddress id={id} />
      </CardFooter>
    </Card>
  )
}

export default Addresses
