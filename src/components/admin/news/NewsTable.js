'use client'

import { useNews } from '@/utils/query/admin/news'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable, columns } from '@/components/admin/news/table'

const NewsTable = () => {
  const { data: news, isLoading } = useNews()

  if (isLoading) {
    return <Skeleton className={'h-10'} />
  }

  return (
    <DataTable
      columns={columns}
      data={news || []}
    />
  )
}

export default NewsTable
