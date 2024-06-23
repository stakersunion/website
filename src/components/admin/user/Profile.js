'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/utils/query/admin/user'

const Profile = ({ id }) => {
  const { data: user, isLoading: loadingUser } = useUser({ id })

  if (loadingUser) {
    return <Skeleton className={'w-1/2 h-64'} />
  }

  return (
    <Card className={'w-1/2'}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={'font-semibold text-muted-foreground'}>Account Address:</p>
        <p>{user.profile.address}</p>
        <Separator className={'my-4'} />
        <p className={'font-semibold text-muted-foreground'}>Display Name:</p>
        <p>{user.profile.name || 'Not set'}</p>
        <Separator className={'my-4'} />
        <p className={'font-semibold text-muted-foreground'}>Email:</p>
        <p>{user.profile.email || 'Not set'}</p>
      </CardContent>
    </Card>
  )
}

export default Profile
