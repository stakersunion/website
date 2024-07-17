import { Separator } from '@/components/ui/separator'
import { Profile, Verification, Appeal } from '@/components/admin/user'
import { AddressesTable } from '@/components/admin/user/addresses'

const User = ({ params }) => {
  const { id } = params

  return (
    <div>
      <h1 className={'text-2xl font-bold'}>User</h1>
      <p className={'text-muted-foreground text-sm'}>{id}</p>
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
