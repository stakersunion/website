'use client'

import { useState } from 'react'
import Link from 'next/link'
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
import { NewsForm, RemoveNews, SendNews } from '@/components/admin/news'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsis,
  faPencil,
  faTrash,
  faEnvelope,
  faArrowUpRightFromSquare,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

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
    cell: ({ row }) => {
      const link = row.original.link
      if (!link) return
      return (
        <div className={'flex items-center gap-2'}>
          {link.length > 15 ? `${link.substring(0, 15)}...` : link}
          <Link
            href={link}
            target={'_blank'}
            className={'flex items-center gap-2'}
          >
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className={'w-3 h-3'}
            />
          </Link>
        </div>
      )
    },
  },
  {
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }) => {
      const news = row.original
      const [edit, setEdit] = useState(false)

      return (
        <Sheet
          open={edit}
          onOpenChange={setEdit}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit News Item</SheetTitle>
              <SheetDescription>Update an existing news item.</SheetDescription>
            </SheetHeader>
            <NewsForm
              id={news.id}
              callback={() => setEdit(false)}
            />
          </SheetContent>
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
                <SheetTrigger onClick={() => setEdit(true)}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    className={'fa-fw mr-2'}
                  />
                  Edit
                </SheetTrigger>
              </DropdownMenuItem>
              <AlertDialog>
                <DropdownMenuItem
                  className={'w-full'}
                  asChild
                  onSelect={(e) => e.preventDefault()}
                >
                  <AlertDialogTrigger>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={'fa-fw mr-2'}
                    />
                    Send
                  </AlertDialogTrigger>
                </DropdownMenuItem>
                <SendNews id={news.id} />
              </AlertDialog>
              <AlertDialog>
                <DropdownMenuItem
                  className={'w-full'}
                  asChild
                  onSelect={(e) => e.preventDefault()}
                >
                  <AlertDialogTrigger>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={'fa-fw mr-2'}
                    />
                    Delete
                  </AlertDialogTrigger>
                </DropdownMenuItem>
                <RemoveNews id={news.id} />
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </Sheet>
      )
    },
  },
]

export default columns
