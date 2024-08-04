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
import { useDeleteNews } from '@/utils/query/admin/news'

const RemoveAddress = ({ id }) => {
  const { mutate } = useDeleteNews({ id })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete News Item?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to remove this news item?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => mutate()}>Remove</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default RemoveAddress
