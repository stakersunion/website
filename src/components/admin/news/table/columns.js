'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { NewsForm, RemoveNews } from '@/components/admin/news'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPencil, faTrash } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const columns = [
  {
    header: 'Created',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt)
      return createdAt.toLocaleString()
    },
  },
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Content',
    accessorKey: 'content',
  },
  {
    header: 'Link',
    accessorKey: 'link',
  },
  {
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }) => {
      const news = row.original
      const [open, setOpen] = useState(false)

      return (
        <Sheet
          open={open}
          onOpenChange={setOpen}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit News Item</SheetTitle>
              <SheetDescription>Update an existing news item.</SheetDescription>
            </SheetHeader>
            <NewsForm
              id={news.id}
              callback={() => setOpen(false)}
            />
          </SheetContent>
          <AlertDialog>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'ghost'}
                  className={'h-8 w-8 p-0'}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className={'w-full'}
                  asChild
                >
                  <SheetTrigger onClick={() => setOpen(true)}>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className={'fa-fw mr-2'}
                    />
                    Edit
                  </SheetTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={'w-full'}
                  asChild
                >
                  <AlertDialogTrigger>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={'fa-fw mr-2'}
                    />
                    Delete
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <RemoveNews id={news.id} />
          </AlertDialog>
        </Sheet>
      )
    },
  },
]

export default columns
