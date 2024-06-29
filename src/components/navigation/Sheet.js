'use client'

import { usePathname } from 'next/navigation'
import { Sheet as SheetWrap, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Logo, SheetItem } from '@/components/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const Sheet = () => {
  const pathname = usePathname()
  return (
    <SheetWrap>
      <SheetTrigger asChild>
        <Button
          size={'icon'}
          variant={'outline'}
          className={'sm:hidden'}
        >
          <FontAwesomeIcon
            icon={faBars}
            className={'w-5 h-5'}
          />
          <span className={'sr-only'}>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className={'sm:max-w-xs'}
      >
        <nav className={'grid gap-6 text-lg font-medium'}>
          <Logo />
          {Object.values(routes).map((route) => {
            if (route.hidden) return
            return (
              <SheetItem
                key={route.path}
                route={route}
                variant={pathname === route.path ? 'active' : 'default'}
              />
            )
          })}
        </nav>
      </SheetContent>
    </SheetWrap>
  )
}

export default Sheet
