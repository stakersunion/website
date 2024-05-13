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

const SheetItem = ({ path, icon, title, variant }) => {
  return (
    <Link
      href={path}
      className={itemVariants({ variant })}
    >
      <FontAwesomeIcon
        icon={icon}
        className={'w-5 h-5'}
      />
      {title}
    </Link>
  )
}

export default SheetItem
