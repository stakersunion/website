import { useMemo } from 'react'
import { EthAddress } from '@/components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useFormContext } from 'react-hook-form'

const Score = ({ addresses, loading }) => {
  const { setValue } = useFormContext()

  if (loading) {
    return <Skeleton className={'h-[100px]'} />
  }

  const score = useMemo(() => {
    let score = {
      score: 0,
      address: '',
      expires: null,
      updated: null,
    }
    addresses.forEach((address) => {
      if (address.passport?.score > score.score) {
        score.address = address.address
        score.score = address.passport.score
        score.expires = address.passport.expires
        score.updated = address.passport.updated
      }
    })
    setValue('passport', score)
    return score
  }, [addresses])

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
          <p className={'text-8xl font-bold'}>{Math.round(score.score)}</p>
        </div>
        <div>
          <p className={'text-sm text-muted-foreground'}>Expires</p>
          <p className={'text-2xl font-bold'}>
            {score.expires
              ? new Date(score.expires).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'N/A'}
          </p>
          <p className={'mt-2 text-sm text-muted-foreground'}>Last Updated</p>
          <p className={'text-2xl font-bold'}>
            {score.updated
              ? new Date(score.updated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'N/A'}
          </p>
        </div>
        <div>
          <p className={'text-sm text-muted-foreground'}>Address</p>
          <p className={'text-2xl font-bold'}>
            <EthAddress address={score.address} />
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Score
