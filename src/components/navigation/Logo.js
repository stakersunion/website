import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandFist } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import routes from '@/utils/routes'

const Logo = () => {
  return (
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
  )
}

export default Logo
