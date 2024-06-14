'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faLock } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { UpdateRole } from '@/components/admin/users/table'

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const address = row.original.address
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString()
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              className={'h-8 w-8 p-0'}
            >
              <span className={'sr-only'}>Open menu</span>
              <FontAwesomeIcon
                icon={faEllipsis}
                className={'h-4 w-4'}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={'end'}>
            <UpdateRole
              id={id}
              role={'admin'}
              icon={faLock}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default columns
