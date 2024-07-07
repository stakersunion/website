'use client'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useRemoveAddress } from '@/utils/query/admin/user/address'

const RemoveAddress = ({ id, address }) => {
  const { mutate } = useRemoveAddress({ id, address })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Remove Address</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>Are you sure you want to remove this address? The address and all associated validators/metrics will be deleted permanently.</AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => mutate()}>Remove</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default RemoveAddress
