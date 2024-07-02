'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature, faServer, faCamera } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes, getRoute } from '@/utils/routes'

const columns = [
  {
    accessorKey: 'profile.address',
    header: 'Address',
    cell: ({ row }) => {
      const address = row.original.profile.address
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
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
          <FontAwesomeIcon
            icon={faServer}
            className={color[independent?.status || 'incomplete']}
          />
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
      const { id } = row.original

      return (
        <Link href={getRoute({ path: routes.admin.children.user.path, params: { id } })}>
          <Button size={'sm'}>View</Button>
        </Link>
      )
    },
  },
]

export default columns
