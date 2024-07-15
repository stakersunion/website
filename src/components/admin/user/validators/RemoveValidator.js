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
import { useRemoveValidator } from '@/utils/query/admin/user/validator'

const RemoveValidator = ({ id, address, publicKey }) => {
  const { mutate } = useRemoveValidator({ id, address, publicKey })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Remove Validator</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to remove this validator? The validator and all associated
          performance metrics will be deleted permanently.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => mutate()}>Remove</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default RemoveValidator
