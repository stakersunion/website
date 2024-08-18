'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Title } from '@/components'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
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
      <ScrollArea className={'mt-4 mb-1 pb-3 w-full whitespace-nowrap rounded-md'}>
        <div className={'flex gap-x-2'}>
          {Object.values(routes.account.children).map((route) => {
            if (route.hidden) return null
            if (route.title === 'Appeal' && !isPending) return null
            return (
              <Link
                key={route.path}
                href={route.path}
              >
                <Button
                  size={'sm'}
                  variant={currentRoute.path === route.path ? 'secondary' : 'ghost'}
                  value={route.path}
                  className={'h-8'}
                >
                  {route.title}
                </Button>
              </Link>
            )
          })}
        </div>
        <ScrollBar orientation={'horizontal'} />
      </ScrollArea>
      {children}
    </div>
  )
}

export default AccountLayout
