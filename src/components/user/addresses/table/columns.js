import { EthAddress } from '@/components'

const columns = [
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      return (
        <EthAddress
          address={row.original.address}
          length={0}
        />
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    id: 'validators',
    accessorKey: 'validators',
    header: 'Validators',
    cell: ({ row }) => {
      return row.original.validators.length
    },
  },
]

export default columns
