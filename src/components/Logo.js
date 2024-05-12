import Link from 'next/link'
import Image from 'next/image'

const Logo = ({ size = 30, href = '/' }) => {
  return (
    <Link href={href}>
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
