'use client'

import Link from 'next/link'
import { ProfileForm } from '@/components/user'
import { Button } from '@/components/ui/button'
import { useProfile } from '@/utils/query/user/profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const Profile = () => {
  const { data: profile } = useProfile()

  return (
    <ProfileForm
      extraActions={
        <Button
          disabled={!profile?.name}
          className={'ml-auto'}
        >
          <Link href={routes.account.children.addresses.path}>
            Manage Addresses
            <FontAwesomeIcon
              icon={faArrowRight}
              className={'ml-2'}
            />
          </Link>
        </Button>
      }
    />
  )
}

export default Profile
