'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Title } from '@/components'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { routes, getRoute } from '@/utils/routes'

const AdminLayout = ({ children }) => {
  const pathname = usePathname()
  const parentRoute = pathname.split('/').slice(0, 3).join('/')

  const currentRoute = Object.values(routes.admin.children).find(
    (route) => route.path === parentRoute
  )

  return (
    <div className={'container'}>
      <Title>{currentRoute.title}</Title>
      <Tabs className={'mb-6'}>
        <TabsList>
          {Object.values(routes.admin.children).map((route) => {
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

export default AdminLayout
