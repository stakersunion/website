'use client'

import { useQueue } from '@/utils/query/admin/queue'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable, columns } from '@/components/admin/queue/table'

const QueueTable = () => {
  const { data: queue, isLoading } = useQueue()

  if (isLoading) {
    return <Skeleton className={'h-10'} />
  }

  return (
    <DataTable
      columns={columns}
      data={queue || []}
    />
  )
}

export default QueueTable
