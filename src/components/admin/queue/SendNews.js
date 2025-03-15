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
import { useCreateQueue } from '@/utils/query/admin/queue'

const SendNews = ({ id }) => {
  const { mutate } = useCreateQueue()

  const handleSend = () => {
    mutate({
      subject: 'Test',
      message: 'Test Body',
    })
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Send Email?</AlertDialogTitle>
        <AlertDialogDescription>This will send an email to 1 million users.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleSend}>Send</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default SendNews
