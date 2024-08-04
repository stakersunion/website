import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Profile, Verification, Appeal } from '@/components/admin/user'
import { AddressesTable } from '@/components/admin/user/addresses'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const User = ({ params }) => {
  const { id } = params

  return (
    <div>
      <div className={'flex flex-1 flex-row items-center'}>
        <Link href={routes.admin.children.users.path}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={'text-xl text-primary py-4 pr-4'}
          />
        </Link>
        <div className={'flex flex-col'}>
          <h1 className={'text-2xl font-bold'}>User</h1>
          <p className={'text-muted-foreground text-sm'}>{id}</p>
        </div>
      </div>
      <Separator className={'my-6'} />
      <div className={'grid grid-cols-1 md:grid-cols-3 gap-4'}>
        <div className={'md:col-span-1'}>
          <Profile id={id} />
        </div>
        <div className={'md:col-span-2'}>
          <Verification id={id} />
        </div>
      </div>
      <div className={'my-6'}>
        <Appeal id={id} />
      </div>
      <div className={'my-6'}>
        <AddressesTable id={id} />
      </div>
    </div>
  )
}

export default User
