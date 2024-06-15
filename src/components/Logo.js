import Link from 'next/link'
import Image from 'next/image'
import { routes } from '@/utils/routes'

const Logo = ({ size = 30, href = routes.home.path, className }) => {
  return (
    <Link
      href={href}
      className={className}
    >
      <Image
        src={'/logo.svg'}
        alt={'Stakers Union'}
        width={size}
        height={size}
      />
    </Link>
  )
}

export default Logo
