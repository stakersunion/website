import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cva } from 'class-variance-authority'

const itemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        active: 'bg-accent text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const SidebarItem = ({ path, icon, title, variant }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={path}
          className={
            itemVariants({ variant }) +
            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8'
          }
        >
          <FontAwesomeIcon
            icon={icon}
            className={'w-4 h-4'}
          />
          <span className={'sr-only'}>{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side={'right'}>{title}</TooltipContent>
    </Tooltip>
  )
}

export default SidebarItem
