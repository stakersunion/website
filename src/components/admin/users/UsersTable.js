'use client'

import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { useUsers } from '@/utils/query/admin/users'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable, columns } from '@/components/admin/users/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const UsersTable = () => {
  const queryClient = useQueryClient()
  const { data: users, isLoading, isRefetching } = useUsers()

  if (isLoading) {
    return <Skeleton className={'h-10'} />
  }

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={users || []}
      />
      <Button
        onClick={handleRefresh}
        disabled={isRefetching}
        className={'mt-4'}
      >
        {isRefetching && (
          <FontAwesomeIcon
            icon={faLoader}
            className={'animate-spin mr-2'}
          />
        )}
        Refresh
      </Button>
    </>
  )
}

export default UsersTable
