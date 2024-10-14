'use client'

import { useEffect } from 'react'
import { UploadDropzone } from '@uploadthing/react'
import { toast } from 'sonner'
import { useUpdateVerification } from '@/utils/query/user/verification'

const PhotoForm = () => {
  const { mutateAsync: updateVerification, isSuccess, error } = useUpdateVerification()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Photo submitted successfully')
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  const handleError = (error) => {
    const errorMessage = error?.message?.includes('FileSizeMismatch')
      ? 'File size exceeds the limit of 4MB. Please try again.'
      : 'Error uploading file. Please try again.'

    toast.error(errorMessage)
  }

  const handleBeforeUpload = async (files) => {
    try {
      if (typeof window === 'undefined') {
        toast.error('Image processing is only available in the browser.')
        return []
      }

      const file = files[0]
      if (!file) {
        toast.error('No file selected. Please try again.')
        return []
      }

      // Lazy load the stripEXIF function
      const { default: stripEXIF } = await import('@/utils/stripExif')
      const newFile = await stripEXIF(file)

      if (!(newFile instanceof File)) {
        toast.error('Processed file is invalid. Please try again.')
        return []
      }

      toast.success('Image metadata stripped successfully.')
      return [newFile]
    } catch (error) {
      toast.error('Failed to process image. Please try again.')
      return []
    }
  }

  return (
    <UploadDropzone
      appearance={{
        button:
          'w-full rounded-md text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground ut-uploading:bg-primary/90',
        label: 'text-sm text-primary hover:text-primary/90',
        container: 'my-0 border-2 border-input border-dashed rounded-md p-4',
        uploadIcon: 'text-primary',
        allowedContent: 'text-muted-foreground',
      }}
      endpoint={'residential'}
      url={'/api/upload'}
      onBeforeUploadBegin={handleBeforeUpload}
      onClientUploadComplete={(res) => {
        updateVerification({ photo: res[0].url })
      }}
      onUploadError={handleError}
    />
  )
}

export default PhotoForm
