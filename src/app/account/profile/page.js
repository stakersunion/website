'use client'

import { Suspense } from 'react'
import { ProfileForm } from '@/components/user'

const Profile = () => {
  return (
    <Suspense>
      <ProfileForm />
    </Suspense>
  )
}

export default Profile
