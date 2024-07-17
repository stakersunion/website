'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { EthAddress } from '@/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignature,
  faGavel,
  faServer,
  faCamera,
  faEllipsis,
  faArrowsUpDown,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes, getRoute } from '@/utils/routes'
import { cn } from '@/utils/shadcn'

const columns = [
  {
    id: 'address',
    accessorKey: 'profile.address',
    header: 'Address',
    cell: ({ row }) => {
      const { id, profile } = row.original
      return (
        <Link href={getRoute({ path: routes.admin.children.user.path, params: { id } })}>
          <EthAddress
            address={profile.address}
            clipboard={false}
            className={'font-bold hover:underline hover:underline-offset-4'}
          />
        </Link>
      )
    },
  },
  {
    id: 'name',
    accessorKey: 'profile.name',
    header: 'Name',
  },
  {
    id: 'email',
    accessorKey: 'profile.email',
    header: 'Email',
  },
  {
    id: 'discord',
    accessorKey: 'profile.discord',
    header: 'Discord',
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created
          <FontAwesomeIcon
            icon={faArrowsUpDown}
            className={'w-3 h-3 ml-2'}
          />
        </Button>
      )
    },
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString()
    },
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      if (!row.original.verification) return null

      let {
        verification: { eligibility, independent, residential },
        appeal,
      } = row.original

      let color = {
        incomplete: 'text-gray-500',
        pending: 'text-yellow-500',
        approved: 'text-green-500',
        rejected: 'text-red-500',
      }

      return (
        <div className={'flex gap-x-2'}>
          <FontAwesomeIcon
            icon={faSignature}
            className={color[eligibility?.status || 'incomplete']}
          />
          {appeal?.status && (
            <FontAwesomeIcon
              icon={faGavel}
              className={color[appeal.status]}
            />
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <FontAwesomeIcon
                  icon={faServer}
                  className={cn('cursor-pointer', color[independent?.status || 'incomplete'])}
                />
              </TooltipTrigger>
              <TooltipContent>
                {independent?.schedule
                  ? new Date(independent.schedule).toLocaleString()
                  : 'Unscheduled'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <FontAwesomeIcon
            icon={faCamera}
            className={color[residential?.status || 'incomplete']}
          />
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, profile } = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={getRoute({ path: routes.admin.children.user.path, params: { id } })}>
                View User
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default columns
