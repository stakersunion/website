import { useMemo } from 'react'
import { EthAddress } from '@/components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useVerification } from '@/utils/query/user/verification'

const Score = () => {
  const { data: verification, isLoading: loading } = useVerification()

  if (loading) {
    return <Skeleton className={'h-[100px]'} />
  }

  if (!verification.passport) return

  return (
    <Card>
      <CardHeader>
        <CardTitle>Best Score</CardTitle>
        <CardDescription>
          Obtained from the highest score among your current addresses
        </CardDescription>
      </CardHeader>
      <CardContent className={'grid grid-cols-1 lg:grid-cols-3 gap-4'}>
        <div>
          <p className={'text-sm text-muted-foreground'}>Score</p>
          <p className={'text-8xl font-bold'}>{Math.round(verification.passport.score)}</p>
        </div>
        <div>
          <p className={'text-sm text-muted-foreground'}>Expires</p>
          <p className={'text-2xl font-bold'}>
            {verification.passport.expires
              ? new Date(verification.passport.expires).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'N/A'}
          </p>
          <p className={'mt-2 text-sm text-muted-foreground'}>Last Updated</p>
          <p className={'text-2xl font-bold'}>
            {verification.passport.updated
              ? new Date(verification.passport.updated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'N/A'}
          </p>
        </div>
        <div>
          <p className={'text-sm text-muted-foreground'}>Address</p>
          <EthAddress
            address={verification.passport.address}
            className={'text-2xl font-bold'}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default Score
