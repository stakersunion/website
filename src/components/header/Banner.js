'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Banner = () => {
  return (
    <div className={'w-full bg-zinc-900 text-foreground py-2'}>
      <div className={'container flex items-center justify-center gap-2 text-sm'}>
        <span>Stakers Union Backs EIP-7805 (FOCIL) for Glamsterdam</span>
        <Link
          href={'/eip-7805'}
          className={'inline-flex items-center hover:underline underline-offset-2 font-medium'}
        >
          Learn More
          <FontAwesomeIcon
            icon={faArrowRight}
            className={'ml-1 text-xs'}
          />
        </Link>
      </div>
    </div>
  )
}

export default Banner
