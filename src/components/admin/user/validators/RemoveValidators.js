'use client'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useRemoveValidators } from '@/utils/query/admin/user/validators'
import { toast } from 'sonner'

const RemoveValidators = ({ id, address, indices, callback = () => {} }) => {
  const { mutateAsync: remove, isPending } = useRemoveValidators({ id, address, indices })

  const handleRemove = async () => {
    try {
      await remove()
      callback()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'}>
          <FontAwesomeIcon
            icon={faTrash}
            className={'mr-2'}
          />
          Remove {indices.length} Validators
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Validators</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove these validators? The validators and all associated
            performance metrics will be deleted permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleRemove}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveValidators
