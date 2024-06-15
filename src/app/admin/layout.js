'use client'

import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Title } from '@/components'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { routes } from '@/utils/routes'

const AdminLayout = ({ children }) => {
  const pathname = usePathname()
  const currentRoute = Object.values(routes.admin.children).find((route) =>
    pathname.startsWith(route.path)
  )

  return (
    <div className={'container'}>
      <Title>{currentRoute.title}</Title>
      <Tabs className={'mb-6'}>
        <TabsList>
          {Object.values(routes.admin.children).map((route) => {
            if (route.hidden) return
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
