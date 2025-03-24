'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Status, News, Balances } from '@/components/dashboard'
import { useUserCount } from '@/utils/query/users'

const Home = () => {
  const { data: userCount, isLoading: loadingCount } = useUserCount()

  return (
    <div>
      <Status />
      <News />
      <div className={'my-6 grid grid-cols-1 md:grid-cols-3 gap-4'}>
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <CardDescription>Number of Active Stakers Union Members</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCount ? (
              <Skeleton className={'h-20'} />
            ) : (
              <p className={'text-6xl font-bold'}>{userCount.count}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Distributed</CardTitle>
            <CardDescription>Funds Distributed to Stakers Union Members</CardDescription>
          </CardHeader>
          <CardContent>
            <p className={'text-6xl font-bold'}>0Ξ</p>
          </CardContent>
        </Card>
        <Balances />
      </div>
    </div>
  )
}

export default Home
