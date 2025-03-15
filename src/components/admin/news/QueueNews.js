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
import { useNewsItem } from '@/utils/query/admin/news'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/routes'

const QueueNews = ({ id }) => {
  const { mutateAsync: queue, isPending: queing } = useCreateQueue()
  const { data: news, isLoading: loading } = useNewsItem({ id })
  const router = useRouter()

  const handleSend = async () => {
    try {
      if (loading) {
        throw new Error('News item is still loading.')
      }
      await queue({
        subject: news.title,
        message: news.content,
        link: news.link,
        linkTitle: news.linkTitle,
      })
      toast.success('Emails successfully queued.', {
        action: {
          label: 'View Queue',
          onClick: () => router.push(routes.admin.children.email.path),
        },
      })
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Queue Sending Email?</AlertDialogTitle>
        <AlertDialogDescription>
          This will queue sending an email to all verified users.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleSend}>Send</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default QueueNews
