import { useState } from 'react'
import { useDeleteQueue } from '@/utils/query/admin/queue'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/light'
import { toast } from 'sonner'

const RemoveQueue = ({ table }) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync: remove, isPending: removing } = useDeleteQueue()

  const handleRemove = async () => {
    try {
      let response = await remove({
        ids: table.getFilteredSelectedRowModel().rows.map((row) => row.original.id),
      })
      toast.success(response.data.message)
      table.setRowSelection({})
    } catch (error) {
      toast.error(error.message)
    } finally {
      setOpen(false)
    }
  }

  if (!table.getFilteredSelectedRowModel().rows.length) return null
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size={'icon'}
          variant={'destructive'}
          disabled={removing}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {table.getFilteredSelectedRowModel().rows.length} queued
            emails?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={'sm:justify-start'}>
          <DialogClose asChild>
            <Button
              type={'button'}
              variant={'secondary'}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleRemove}
            disabled={removing}
            variant={'destructive'}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RemoveQueue