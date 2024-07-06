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
import { useRemoveAddress } from '@/utils/query/admin/user/address'

const RemoveAddress = ({ id, address }) => {
  const { mutate, isLoading } = useRemoveAddress({ id, address })
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
          <AlertDialogTitle>Remove Address</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to remove this address?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate()}
            isLoading={isLoading}
          >
            Remove
          </AlertDialogAction>
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

export default RemoveAddress
