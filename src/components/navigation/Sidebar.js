'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarItem } from '@/components/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandFist } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import routes from '@/utils/routes'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside
      className={'fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'}
    >
      <nav className={'flex flex-col items-center gap-4 px-2 sm:py-5'}>
        <Link
          href={routes.home.path}
          className={
            'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
          }
        >
          <FontAwesomeIcon
            icon={faHandFist}
            className={'h-4 w-4 transition-all group-hover:scale-110'}
          />
          <span className='sr-only'>Stakers Union</span>
        </Link>
        {Object.values(routes).map((route) => (
          <SidebarItem
            key={route.path}
            route={route}
            variant={pathname === route.path ? 'active' : 'default'}
          />
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
