'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandFist } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { Menu, MobileMenu, Account } from '@/components/header'
import { routes } from '@/utils/routes'

const Header = () => {
  return (
    <div className={'container flex items-center py-4'}>
      <Link href={routes.home.path}>
        <FontAwesomeIcon
          icon={faHandFist}
          className={'mr-4 hover:text-muted-foreground transition-all'}
        />
      </Link>
      <div className={'flex flex-1'}>
        <Menu />
        <MobileMenu />
      </div>
      <Account />
    </div>
  )
}

export default Header
