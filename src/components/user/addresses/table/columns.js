const columns = [
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'category',
    header: 'Category',
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
]

export default columns
