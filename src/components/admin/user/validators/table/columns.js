import { createColumnHelper } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { EthAddress } from '@/components'
import { RemoveValidator } from '@/components/admin/user/validators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faClipboard, faTrash } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const columnHelper = createColumnHelper()

const columns = ({ id, address }) => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
  },

  columnHelper.group({
    id: 'info',
    header: 'Validator Information',
    columns: [
      columnHelper.accessor('index', {
        header: 'Index',
      }),
      columnHelper.accessor('publicKey', {
        header: 'Public Key',
        cell: ({ row }) => {
          return <EthAddress address={row.original.publicKey} />
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          return row.original.status
        },
      }),
      columnHelper.accessor('activationEpoch', {
        header: 'Activation Epoch',
        cell: ({ row }) => {
          return row.original.activationEpoch
        },
      }),
    ],
  }),
  columnHelper.group({
    id: 'performance',
    header: 'Performance',
    columns: [
      columnHelper.accessor('attestations', {
        header: 'Attestations',
        cell: ({ row }) => {
          return row.original.performance?.attestations
        },
      }),
      columnHelper.accessor('proposals', {
        header: 'Proposals',
        cell: ({ row }) => {
          return row.original.performance?.proposals
        },
      }),
      columnHelper.accessor('sync', {
        header: 'Sync',
        cell: ({ row }) => {
          return row.original.performance?.sync
        },
      }),
    ],
  }),
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const { index, publicKey } = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(index)}>
                <FontAwesomeIcon
                  icon={faClipboard}
                  className={'fa-fw mr-2'}
                />
                Copy Validator Index
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
          <RemoveValidator
            id={id}
            address={address}
            publicKey={publicKey}
          />
        </AlertDialog>
      )
    },
  },
]

export default columns
