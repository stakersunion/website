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
    let errorMessage = error?.message
    if (errorMessage && errorMessage.includes('FileSizeMismatch')) {
      errorMessage = 'File size exceeds the limit of 4MB. Please try again.'
    }
    toast.error('Error uploading file. Please try again.', {
      description: errorMessage,
    })
  }

  return (
    <UploadDropzone
      appearance={{
        button:
          'w-full rounded-md text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground ut-uploading:bg-primary/90',
        label: 'text-sm text-primary hover:text-primary/90',
        container: 'my-6 border-2 border-input border-dashed rounded-md p-4',
        uploadIcon: 'text-primary',
        allowedContent: 'text-muted-foreground',
      }}
      endpoint={'residential'}
      url={'/api/upload'}
      onClientUploadComplete={(res) => {
        updateVerification({ photo: res[0].url })
      }}
      onUploadError={handleError}
    />
  )
}

export default PhotoForm
