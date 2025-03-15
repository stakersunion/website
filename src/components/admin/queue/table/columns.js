'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faCheck,
  faTriangleExclamation,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const columns = [
  {
    header: 'Created',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt)
      return createdAt.toLocaleString()
    },
  },
  {
    header: 'Recipient',
    accessorKey: 'recipient',
  },
  {
    header: 'Subject',
    accessorKey: 'subject',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const { status } = row.original
      const icons = {
        pending: faClock,
        sent: faCheck,
        failed: faTriangleExclamation,
      }
      return (
        <div className={'flex items-center'}>
          <FontAwesomeIcon icon={icons[status]} />
        </div>
      )
    },
  },
]

export default columns
