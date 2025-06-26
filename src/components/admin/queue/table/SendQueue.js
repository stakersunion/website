import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { useSend } from '@/utils/query/admin/send'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/light'
import { toast } from 'sonner'

const SendQueue = ({ table, data }) => {
  const [open, setOpen] = useState(false)
  const [limit, setLimit] = useState(10)
  const { mutateAsync: send, isPending: sending } = useSend()

  const recent = useMemo(() => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000 // 1 hour in milliseconds

    return data.filter((item) => {
      // Ensure 'status' is 'sent' and 'sentAt' is within last hour
      return item.status === 'sent' && new Date(item.sentAt).getTime() > oneHourAgo
    }).length
  }, [data])

  const handleSend = async () => {
    try {
      let response = await send({
        limit,
        ids: table.getFilteredSelectedRowModel().rows.map((row) => row.original.id),
      })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <FontAwesomeIcon
            icon={faEnvelope}
            className={'mr-2'}
          />
          {table.getFilteredSelectedRowModel().rows.length ? 'Send Selected' : 'Trigger Send'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How Many (limit 100/hr)</DialogTitle>
          <DialogDescription>{recent} emails sent in the last hour.</DialogDescription>
        </DialogHeader>
        <Input
          type={'number'}
          min={1}
          max={100}
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <DialogFooter className={'sm:justify-start'}>
          <DialogClose asChild>
            <Button
              type={'button'}
              variant={'secondary'}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? (
              <FontAwesomeIcon
                icon={faLoader}
                className={'animate-spin mr-2'}
              />
            ) : null}
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SendQueue
