'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Title } from '@/components'
import { Status, Balances } from '@/components/dashboard'
import { useUserCount } from '@/utils/query/users'

const Home = () => {
  const { data: userCount, isLoading: loadingCount } = useUserCount()

  return (
    <div className={'container'}>
      <Title>Home</Title>
    </div>
  )
}

export default Home
