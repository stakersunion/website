'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
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
import { useNewsItem, useEditNews } from '@/utils/query/admin/news'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const NewsForm = ({ id, callback = () => {} }) => {
  const { data: news } = useNewsItem({ id })
  const { mutateAsync: editNews, isPending, isSuccess, error } = useEditNews({ id })

  const formSchema = z.object({
    title: z.string(),
    content: z.string(),
    link: z.string().url().or(z.literal('')),
    linkTitle: z.string().optional(),
    archived: z.boolean().optional(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      link: '',
      linkTitle: '',
      archived: false,
    },
    values: news,
  })

  const onSubmit = async (values) => {
    await editNews(values)
    callback()
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('News item updated successfully')
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return (
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
                  placeholder={'Button Text'}
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
          name={'archived'}
          render={({ field }) => (
            <FormItem className={'flex flex-row items-start space-x-3 space-y-0'}>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className={'space-y-1 leading-none'}>
                <FormLabel>Archive</FormLabel>
              </div>
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
          Save
        </Button>
      </form>
    </Form>
  )
}

export default NewsForm
