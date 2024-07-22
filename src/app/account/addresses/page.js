'use client'

import { DataTable, columns } from '@/components/user/addresses'
import { Skeleton } from '@/components/ui/skeleton'
import { Building } from '@/components/user'
import { useUser } from '@/utils/query/user'

const Addresses = () => {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return <Skeleton className={'h-[300px]'} />
  }

  return (
    <div className={'flex flex-col gap-6'}>
      <Building />
      <DataTable
        columns={columns}
        data={user?.addresses || []}
      />
    </div>
  )
}

export default Addresses
