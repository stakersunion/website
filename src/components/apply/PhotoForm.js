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
      onUploadError={(error) => {
        toast.error('Error uploading file. Please try again.')
      }}
    />
  )
}

export default PhotoForm
