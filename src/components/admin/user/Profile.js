'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser, useUpdateUser } from '@/utils/query/admin/user'
import { EthAddress } from '@/components'
import { cn } from '@/utils/shadcn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Profile = ({ id }) => {
  const { data: user, isLoading: loadingUser } = useUser({ id })
  const { mutateAsync: updateUser } = useUpdateUser({ id })
  const [updating, setUpdating] = useState(null)

  const handleToggle = async (key) => {
    setUpdating(key)
    await updateUser({ [key]: !user.profile[key] })
    setUpdating(null)
  }

  if (loadingUser) {
    return <Skeleton className={'h-64'} />
  }

  return (
    <Card className={'h-full'}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
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
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
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
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <div>
            <p className={'font-semibold text-muted-foreground'}>POAP:</p>
            <FontAwesomeIcon
              className={cn('cursor-pointer', { 'fa-spin': updating === 'poapAssigned' })}
              onClick={() => handleToggle('poapAssigned')}
              icon={
                updating === 'poapAssigned'
                  ? faLoader
                  : user.profile.poapAssigned
                  ? faCheck
                  : faTimes
              }
            />
          </div>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Discord Role:</p>
            <FontAwesomeIcon
              className={cn('cursor-pointer', { 'fa-spin': updating === 'discordRole' })}
              onClick={() => handleToggle('discordRole')}
              icon={
                updating === 'discordRole' ? faLoader : user.profile.discordRole ? faCheck : faTimes
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Profile
