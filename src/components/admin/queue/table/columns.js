'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
        <TooltipProvider>
          <Tooltip className={'flex items-center'}>
            <TooltipTrigger asChild>
              <FontAwesomeIcon icon={icons[status]} />
            </TooltipTrigger>
            {status === 'failed' && <TooltipContent className={'w-[400px]'}>{row.original.errorMessage}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
]

export default columns
