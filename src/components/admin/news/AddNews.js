'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateNews } from '@/utils/query/admin/news'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const AddNews = () => {
  const [open, setOpen] = useState(false)
  const { mutateAsync: createNews, isPending, isSuccess, error } = useCreateNews()

  const formSchema = z.object({
    title: z.string(),
    content: z.string(),
    link: z.string().url().or(z.literal('')),
    linkTitle: z.string().optional(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      link: '',
      linkTitle: '',
    },
  })

  const onSubmit = async (values) => {
    await createNews(values)
    setOpen(false)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('News item submitted successfully')
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button>
          <FontAwesomeIcon
            icon={faPlus}
            className={'mr-2'}
          />
          Add News Item
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add News Item</SheetTitle>
          <SheetDescription>Add a news item for verified members</SheetDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={'space-y-8'}
            >
              <FormField
                control={form.control}
                name={'title'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'News Title'}
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'content'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={'News Content'}
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'link'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'News Link'}
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'linkTitle'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Text</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'Read More'}
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                type={'submit'}
              >
                {isPending && (
                  <FontAwesomeIcon
                    icon={faLoader}
                    className={'mr-2 h-4 w-4 animate-spin'}
                  />
                )}
                Add
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default AddNews
