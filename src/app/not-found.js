'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoNotEnter } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const NotFound = () => {
  return (
    <div className={'flex flex-1 min-h-[calc(100vh-8rem)]  justify-center items-center'}>
      <div className={'flex flex-col'}>
        <FontAwesomeIcon
          icon={faDoNotEnter}
          className={'text-2xl mb-2'}
        />
        <h1 className={'text-2xl font-bold mb-10'}>Page Not Found</h1>
        <Link href={routes.home.path}>
          <Button className={'w-full'}>Return Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
