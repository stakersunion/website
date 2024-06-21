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
          'rounded-md text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground',
        label: 'text-sm text-primary hover:text-primary/90',
        container: 'border-2 border-input rounded-md p-4',
        icon: 'text-primary',
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
