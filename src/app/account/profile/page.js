'use client'

import Link from 'next/link'
import { ProfileForm } from '@/components/user'
import { Button } from '@/components/ui/button'
import { useUser } from '@/utils/query/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const Profile = () => {
  const { data: user } = useUser()

  return (
    <ProfileForm
      extraActions={
        <Button
          disabled={!user?.name}
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
