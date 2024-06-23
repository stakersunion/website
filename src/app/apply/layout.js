'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Title } from '@/components'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/shadcn'
import { routes } from '@/utils/routes'

const SetupLayout = ({ children }) => {
  const pathname = usePathname()
  const currentRoute = Object.values(routes.apply.children).find((route) =>
    pathname.startsWith(route.path)
  )

  return (
    <div className={'container'}>
      <Title>Application</Title>
      <div className={'flex flex-col md:flex-row gap-4'}>
        {Object.values(routes.apply.children).map((route, index) => {
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
      {children}
    </div>
  )
}

export default SetupLayout
