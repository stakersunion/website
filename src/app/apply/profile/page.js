'use client'

import { useRouter } from 'next/navigation'
import { ProfileForm } from '@/components/user'
import { routes } from '@/utils/routes'

const ApplyProfile = () => {
  const router = useRouter()

  const onSubmit = () => {
    router.push(routes.apply.children.eligibility.path)
  }

  return (
    <ProfileForm
      callback={onSubmit}
      submitText={'Save and Continue'}
    />
  )
}

export default ApplyProfile
