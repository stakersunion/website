'use client'

import { useRef, useState } from 'react'
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
import { useRemoveValidator } from '@/utils/query/admin/user/validator'

const RemoveValidator = ({ id, address, publicKey }) => {
  const { mutate, isLoading } = useRemoveValidator({ id, address, publicKey })
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef()

  return (
    <AlertDialog
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Validator</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to remove this validator?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <AlertDialogTrigger onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon
          icon={faTrash}
          className={'text-muted-foreground hover:text-foreground'}
        />
      </AlertDialogTrigger>
    </AlertDialog>
  )
}

export default RemoveValidator