'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Submit } from '@/components/addresses'
import { useUser } from '@/utils/query/user'

const Addresses = () => {
  const { data: user, isLoading, isError } = useUser()

  if (isLoading) {
    return <Skeleton className={'h-[300px]'} />
  }

  return (
    <div>
      <div className={'flex justify-end mb-6'}>
        <Submit />
      </div>
      <Table>
        <TableCaption>A list of your submitted addresses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className={'w-2/3'}>Address</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!user.addresses.length && (
            <TableRow>
              <TableCell colSpan={3}>No addresses found.</TableCell>
            </TableRow>
          )}
          {user.addresses.map((address) => {
            return (
              <TableRow key={address.id}>
                <TableCell>{address.address}</TableCell>
                <TableCell>{address.type}</TableCell>
                <TableCell>{address.status}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default Addresses
