'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet as SheetWrap, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { SheetItem } from '@/components/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHandFist } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import routes from '@/utils/routes'

const Sheet = () => {
  const pathname = usePathname()
  return (
    <SheetWrap>
      <SheetTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='sm:hidden'
        >
          <FontAwesomeIcon
            icon={faBars}
            className='w-5 h-5'
          />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='sm:max-w-xs'
      >
        <nav className='grid gap-6 text-lg font-medium'>
          <Link
            href={routes.home.path}
            className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
          >
            <FontAwesomeIcon
              icon={faHandFist}
              className='w-5 h-5 transition-all group-hover:scale-110'
            />
            <span className='sr-only'>Acme Inc</span>
          </Link>

          {Object.values(routes).map((route) => (
            <SheetItem
              key={route.path}
              path={route.path}
              icon={route.icon}
              title={route.title}
              variant={pathname === route.path ? 'active' : 'default'}
            />
          ))}
        </nav>
      </SheetContent>
    </SheetWrap>
  )
}

export default Sheet