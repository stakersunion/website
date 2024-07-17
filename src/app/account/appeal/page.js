'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { AppealStatus, AppealForm } from '@/components/user/appeal'
import { useAppeal } from '@/utils/query/user/appeal'

const Appeal = () => {
  const { data: appeal, isLoading } = useAppeal()

  if (isLoading) return <Skeleton className={'h-[400px]'} />

  if (appeal.status) return <AppealStatus appeal={appeal} />
  return <AppealForm />
}

export default Appeal
