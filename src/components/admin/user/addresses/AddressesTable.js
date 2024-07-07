'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AddAddress } from '@/components/admin/user/addresses'
import { DataTable, columns } from '@/components/admin/user/addresses/table'
import { useAddresses } from '@/utils/query/admin/user/addresses'

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
        <DataTable
          columns={columns(id)}
          data={addresses || []}
        />
      </CardContent>
      <CardFooter>
        <AddAddress id={id} />
      </CardFooter>
    </Card>
  )
}

export default Addresses
