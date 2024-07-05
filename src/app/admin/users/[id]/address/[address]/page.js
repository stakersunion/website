'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AddressForm } from '@/components/admin/user'
import { Validators } from '@/components/admin/user/validators'

const Address = ({ params }) => {
  return (
    <div className={'flex flex-col gap-y-4'}>
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
