'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileForm } from '@/components/user'
import { routes } from '@/utils/routes'
import { useVerificationStatus } from '@/utils/query/user/verification'

const ApplyProfile = () => {
  const router = useRouter()
  const { refetch, fetchStatus } = useVerificationStatus()
  const refetchInitiated = useRef(false)

  const onSubmit = async () => {
    refetchInitiated.current = true
    refetch()
  }

  useEffect(
    function redirectAfterRefetch() {
      if (fetchStatus === 'idle' && refetchInitiated.current) {
        refetchInitiated.current = false
        router.push(routes.apply.children.eligibility.path)
      }
    },
    [fetchStatus]
  )

  return (
    <ProfileForm
      callback={onSubmit}
      submitText={'Save and Continue'}
    />
  )
}

export default ApplyProfile
