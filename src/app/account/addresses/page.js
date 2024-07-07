'use client'

import { DataTable, columns } from '@/components/user/addresses'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/utils/query/user'

const Addresses = () => {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return <Skeleton className={'h-[300px]'} />
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={user?.addresses || []}
      />
    </div>
  )
}

export default Addresses
