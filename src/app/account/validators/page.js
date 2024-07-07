'use client'

import { DataTable, columns } from '@/components/user/validators'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/utils/query/user'

const Validators = () => {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return <Skeleton className={'h-[300px]'} />
  }

  const allValidators =
    user?.addresses?.reduce((acc, address) => {
      if (address.validators) {
        acc.push(...address.validators)
      }
      return acc
    }, []) || []

  return (
    <div>
      <DataTable
        columns={columns}
        data={allValidators || []}
      />
    </div>
  )
}

export default Validators
