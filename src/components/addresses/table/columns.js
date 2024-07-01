'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPencil, faTrash } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { DeleteDialog } from '@/components'

export const columns = [
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, address } = row.original

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
            <DropdownMenuItem disabled={true}>
              <FontAwesomeIcon
                icon={faPencil}
                className={'mr-2 fa-fw'}
              />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem disabled={true} onSelect={(e) => e.preventDefault()}>
              <DeleteDialog
                trigger={
                  <>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={'mr-2 fa-fw'}
                    />
                    Delete
                  </>
                }
                message={`Are you sure you want to delete "${address}"?`}
                handleDelete={() => console.log('Delete', id)}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
