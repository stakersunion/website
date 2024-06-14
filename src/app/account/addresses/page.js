'use client'

import DataTable from '@/components/addresses/table/DataTable'
import { columns } from '@/components/addresses/table/columns'
import { Skeleton } from '@/components/ui/skeleton'
import { Create } from '@/components/addresses'
import { useUser } from '@/utils/query/user'

const Addresses = () => {
  const { data: user, isLoading, isError } = useUser()

  if (isLoading) {
    return <Skeleton className={'h-[300px]'} />
  }

  return (
    <div>
      <div className={'flex justify-end mb-6'}>
        <Create />
      </div>
      <DataTable
        columns={columns}
        data={user?.addresses || []}
      />
    </div>
  )
}

export default Addresses
