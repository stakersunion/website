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
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AddAddress } from '@/components/admin/user'
import { useUser } from '@/utils/query/admin/user'
import { routes, getRoute } from '@/utils/routes'

const Addresses = ({ id }) => {
  const { data: user, isLoading: loadingUser } = useUser({ id })

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
            {user.addresses.map((address) => {
              return (
                <TableRow key={address.address}>
                  <TableCell>{address.address}</TableCell>
                  <TableCell>{address.type}</TableCell>
                  <TableCell>
                    <Link
                      href={getRoute({
                        path: routes.admin.children.address.path,
                        params: { id, address: address.address },
                      })}
                    >
                      <Button size={'sm'}>View</Button>
                    </Link>
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
