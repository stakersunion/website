'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useVerification, useUpdateVerification } from '@/utils/query/admin/user/verification'
import { titleCase } from '@/utils/string'
import { cn } from '@/utils/shadcn'

const Status = ({ step, id }) => {
  const [changeStep, setChangeStep] = useState(null)
  const { data: verification } = useVerification({ id })
  const { mutate: updateVerification, isPending: updatingVerification } = useUpdateVerification({
    id,
  })

  const colors = {
    pending: 'bg-orange-600',
    approved: 'bg-green-600',
    rejected: 'bg-red-600',
  }

  const handleStatusChange = ({ step, status }) => {
    setChangeStep(step)
    updateVerification({
      ...verification,
      [step]: { status },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge
          variant={'secondary'}
          className={cn(
            colors[step.status],
            `hover:${colors[step.status]}`,
            'hover:bg-opacity-80 transition-all duration-200 ease-in-out'
          )}
        >
          {updatingVerification && changeStep === step.key ? (
            <FontAwesomeIcon
              icon={faLoader}
              className={'animate-spin'}
            />
          ) : (
            titleCase(step.status)
          )}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Set status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleStatusChange({ step: step.key, status: 'pending' })
          }}
        >
          <div className={cn(colors.pending, 'w-2 h-2 rounded-full inline-block mr-2')}></div>
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleStatusChange({ step: step.key, status: 'approved' })
          }}
        >
          <div className={cn(colors.approved, 'w-2 h-2 rounded-full inline-block mr-2')}></div>
          Approved
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleStatusChange({ step: step.key, status: 'rejected' })
          }}
        >
          <div className={cn(colors.rejected, 'w-2 h-2 rounded-full inline-block mr-2')}></div>
          Rejected
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Status
