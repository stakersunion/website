'use client'

import { EthAddress } from '@/components'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useUser } from '@/utils/query/admin/user'
import { useUpdateAppeal } from '@/utils/query/admin/user/appeal'
import { titleCase } from '@/utils/string'
import { cn } from '@/utils/shadcn'

const Appeal = ({ id }) => {
  const { data: user, isLoading: loadingUser } = useUser({ id })
  const { mutate: updateAppeal, isPending: updatingAppeal } = useUpdateAppeal({ id })

  const colors = {
    pending: 'bg-orange-600',
    approved: 'bg-green-600',
    rejected: 'bg-red-600',
  }

  const handleCopy = () => {
    const appealContent = `### Appeal

**Address:** ${user.appeal.address}

**Address Type:** ${user.appeal.type}

**Method:** ${user.appeal.method}

**Rationale:** ${user.appeal.rationale}`

    navigator.clipboard.writeText(appealContent)
  }

  const handleStatusChange = ({ status }) => {
    updateAppeal({ status })
  }

  if (loadingUser) {
    return <Skeleton className={'h-64'} />
  }

  if (!user.appeal) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appeal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Address:</p>
            <EthAddress address={user.appeal.address} />
          </div>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Address Type:</p>
            <p>{user.appeal.type}</p>
          </div>
        </div>
        <Separator className={'my-4'} />
        <div>
          <p className={'font-semibold text-muted-foreground'}>Method:</p>
          <p>{user.appeal.method}</p>
        </div>
        <Separator className={'my-4'} />
        <div>
          <p className={'font-semibold text-muted-foreground'}>Rationale:</p>
          <p>{user.appeal.rationale}</p>
        </div>
      </CardContent>
      <CardFooter className={'gap-x-6'}>
        <Button onClick={handleCopy}>
          <FontAwesomeIcon
            icon={faClipboard}
            className={'mr-2'}
          />
          Copy Appeal
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Badge
              variant={'secondary'}
              className={cn(
                colors[user.appeal.status],
                `hover:${colors[user.appeal.status]}`,
                'hover:bg-opacity-80 transition-all duration-200 ease-in-out'
              )}
            >
              {updatingAppeal ? (
                <FontAwesomeIcon
                  icon={faLoader}
                  className={'animate-spin'}
                />
              ) : (
                titleCase(user.appeal.status)
              )}
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Set status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleStatusChange({ status: 'pending' })
              }}
            >
              <div className={cn(colors.pending, 'w-2 h-2 rounded-full inline-block mr-2')}></div>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleStatusChange({ status: 'approved' })
              }}
            >
              <div className={cn(colors.approved, 'w-2 h-2 rounded-full inline-block mr-2')}></div>
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleStatusChange({ status: 'rejected' })
              }}
            >
              <div className={cn(colors.rejected, 'w-2 h-2 rounded-full inline-block mr-2')}></div>
              Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}

export default Appeal
