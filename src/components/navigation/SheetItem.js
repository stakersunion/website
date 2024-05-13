import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cva } from 'class-variance-authority'

const itemVariants = cva(
  'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        active: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const SheetItem = ({ route, variant }) => {
  return (
    <Link
      href={route.path}
      target={route.target}
      className={itemVariants({ variant })}
    >
      <FontAwesomeIcon
        icon={route.icon}
        className={'w-5 h-5'}
      />
      {route.title}
    </Link>
  )
}

export default SheetItem
