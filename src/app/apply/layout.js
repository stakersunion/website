'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Title } from '@/components'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { cn } from '@/utils/shadcn'
import { routes } from '@/utils/routes'

const ApplyLayout = ({ children }) => {
  const pathname = usePathname()
  const currentRoute = Object.values(routes.apply.children).find((route) =>
    pathname.startsWith(route.path)
  )

  return (
    <div className={'container'}>
      <SignedOut>
        <Title>Apply</Title>
        <Separator className={'my-6'} />
        {children}
      </SignedOut>
      <SignedIn>
        <Title>Application</Title>
        <div className={'flex flex-col md:flex-row gap-4'}>
          {Object.values(routes.apply.children).map((route, index) => {
            if (!currentRoute) return null
            return (
              <Link
                href={route.path}
                key={route.path}
                className={cn(currentRoute.path != route.path && 'opacity-20', 'flex-1')}
              >
                <Badge>Step {index + 1}</Badge>
                <div className={'pt-2 pl-2'}>
                  <h2 className={'font-semibold'}>{route.title}</h2>
                  <p className={'text-sm text-muted-foreground'}>{route.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
        <Separator className={'my-6'} />
        <div className={'pb-10'}>{children}</div>
      </SignedIn>
    </div>
  )
}

export default ApplyLayout
