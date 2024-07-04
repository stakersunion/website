'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/utils/query/admin/user'
import { EthAddress } from '@/components'

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
        <div className={'grid grid-cols-2 gap-4'}>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Display Name:</p>
            <p>{user.profile.name || 'Not set'}</p>
          </div>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Email:</p>
            <p>{user.profile.email || 'Not set'}</p>
          </div>
        </div>
        <Separator className={'my-4'} />
        <div className={'grid grid-cols-2 gap-4'}>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Discord:</p>
            <p>{user.profile.discord || 'Not set'}</p>
          </div>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Withdrawal Addresss:</p>
            <EthAddress address={user.profile.withdrawalAddress} />
          </div>
        </div>
        <Separator className={'my-4'} />
      </CardContent>
    </Card>
  )
}

export default Profile
