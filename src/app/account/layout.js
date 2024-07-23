'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Title } from '@/components'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { routes } from '@/utils/routes'
import { useVerification } from '@/utils/query/user/verification'

const AccountLayout = ({ children }) => {
  const pathname = usePathname()
  const currentRoute = Object.values(routes.account.children).find(
    (route) => route.path === pathname
  )

  const { data: verification } = useVerification()
  const isPending = useMemo(() => {
    if (verification?.eligibility?.status === 'pending') return true
    else return false
  }, [verification])

  return (
    <div className={'container'}>
      <Title>{currentRoute.title}</Title>
      <Tabs className={'mb-6'}>
        <TabsList>
          {Object.values(routes.account.children).map((route) => {
            if (route.hidden) return null
            if (route.title === 'Appeal' && !isPending) return null
            return (
              <Link
                key={route.path}
                href={route.path}
              >
                <TabsTrigger
                  data-state={currentRoute.path === route.path ? 'active' : 'inactive'}
                  value={route.path}
                >
                  {route.title}
                </TabsTrigger>
              </Link>
            )
          })}
        </TabsList>
      </Tabs>
      {children}
    </div>
  )
}

export default AccountLayout
