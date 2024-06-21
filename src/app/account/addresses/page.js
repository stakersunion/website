'use client'

import DataTable from '@/components/addresses/table/DataTable'
import { columns } from '@/components/addresses/table/columns'
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
