import { createUploadthing } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { auth } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

const f = createUploadthing()

const fileRouter = {
  residential: f({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const { userId } = auth()

      // If you throw, the user will not be able to upload
      if (!userId) throw new UploadThingError('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await connect()
      const user = await User.findOneAndUpdate(
        { id: metadata.userId },
        {
          $set: {
            'profile.residential': file.url,
          },
        },
        { new: true }
      )

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, name: file.url }
    }),
}

export { fileRouter }
