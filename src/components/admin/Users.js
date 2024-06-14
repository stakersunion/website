'use client'

import { useUsers } from '@/utils/query/admin/users'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable, columns } from '@/components/admin/users/table'

const Users = () => {
  const { data: users, isLoading } = useUsers()

  if (isLoading) {
    return <Skeleton className={'h-10'} />
  }

  return (
    <DataTable
      columns={columns}
      data={users || []}
    />
  )
}

export default Users
