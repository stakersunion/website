'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AddressForm } from '@/components/admin/user/addresses'
import { Validators } from '@/components/admin/user/validators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes, getRoute } from '@/utils/routes'

const Address = ({ params }) => {

  return (
    <div className={'flex flex-col gap-y-4'}>
      <div className={'flex flex-1 flex-row items-center'}>
        <Link
          href={getRoute({
            path: routes.admin.children.users.children.user.path,
            params: { id: params.id },
          })}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={'text-xl text-primary py-4 pr-4'}
          />
        </Link>
        <div className={'flex flex-col'}>
          <h1 className={'text-2xl font-bold'}>User</h1>
          <p className={'text-muted-foreground text-sm'}>{params.id}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
          <AddressForm
            id={params.id}
            address={params.address}
          />
        </CardContent>
      </Card>
      <Validators
        id={params.id}
        address={params.address}
      />
    </div>
  )
}

export default Address
