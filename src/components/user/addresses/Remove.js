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
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useRemoveAddress } from '@/utils/query/user/address'

const Remove = ({ address, buttonClassName }) => {
  const { mutateAsync: removeAddress } = useRemoveAddress({ address })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={'sm'}
          variant={'ghost'}
          className={buttonClassName}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Address?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The address will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeAddress()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Remove
