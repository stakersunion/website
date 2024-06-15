'use client'

import { useUser } from '@/utils/query/admin/user'

const User = ({ params }) => {
  const { id } = params
  const { data: user } = useUser({ id })

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default User
