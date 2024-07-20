import { Badge } from '@/components/ui/badge'

const TitleBadge = ({ children }) => {
  return (
    <Badge
      variant={'secondary'}
      className={'uppercase text-[10px] text-muted-foreground font-bold tracking-wider px-4 py-1'}
    >
      {children}
    </Badge>
  )
}

export default TitleBadge