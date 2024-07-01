'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Title } from '@/components'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { routes, getRoute } from '@/utils/routes'

const AdminLayout = ({ children }) => {
  const pathname = usePathname()

  const matchPath = (pathname) => {
    const paths = Object.values(routes.admin.children).map((route) => route.path)
    const pathParts = pathname.split('/').filter(Boolean)

    for (const path of paths) {
      const pathTemplate = path.split('/').filter(Boolean)

      if (pathParts.length === pathTemplate.length) {
        let isMatch = true
        const params = {}

        for (let i = 0; i < pathTemplate.length; i++) {
          if (pathTemplate[i].startsWith('[') && pathTemplate[i].endsWith(']')) {
            const paramName = pathTemplate[i].slice(1, -1)
            params[paramName] = pathParts[i]
          } else if (pathTemplate[i] !== pathParts[i]) {
            isMatch = false
            break
          }
        }

        if (isMatch) {
          return {
            route: Object.values(routes.admin.children).find((route) => route.path === path),
            params,
          }
        }
      }
    }

    return null
  }

  const currentRoute = matchPath(pathname)

  return (
    <div className={'container'}>
      <Title>{currentRoute.route.title}</Title>
      <Breadcrumb className={'my-6'}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={routes.admin.path}>Admin</BreadcrumbLink>
          </BreadcrumbItem>
          {(currentRoute.route.title === 'User' || currentRoute.route.title === 'Address') && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={getRoute({
                      path: routes.admin.children.user.path,
                      params: currentRoute.params,
                    })}
                  >
                    User
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {currentRoute.route.title === 'Address' && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={getRoute({
                      path: routes.admin.children.address.path,
                      params: currentRoute.params,
                    })}
                  >
                    Address
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {children}
    </div>
  )
}

export default AdminLayout
