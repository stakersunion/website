import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { EthAddress } from '@/components'
import { RemoveAddress } from '@/components/admin/user/addresses'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsis,
  faEye,
  faClipboard,
  faTrash,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes, getRoute } from '@/utils/routes'

const columns = (id) => [
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const { address } = row.original

      return (
        <Link
          href={getRoute({
            path: routes.admin.children.address.path,
            params: {
              id,
              address,
            },
          })}
        >
          <EthAddress
            address={row.original.address}
            clipboard={false}
            className={'font-bold hover:underline hover:underline-offset-4'}
          />
        </Link>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString()
    },
  },
  {
    id: 'validators',
    accessorKey: 'validators',
    header: 'Validators',
    cell: ({ row }) => {
      return row.original.validators.length
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const { address } = row.original

      return (
        <AlertDialog>
          <DropdownMenu modal={false}>
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(address)}>
                <FontAwesomeIcon
                  icon={faClipboard}
                  className={'fa-fw mr-2'}
                />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={getRoute({
                    path: routes.admin.children.address.path,
                    params: {
                      id,
                      address,
                    },
                  })}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className={'fa-fw mr-2'}
                  />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertDialogTrigger>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={'fa-fw mr-2'}
                  />
                  Delete
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RemoveAddress
            id={id}
            address={address}
          />
        </AlertDialog>
      )
    },
  },
]

export default columns
