import { Separator } from '@/components/ui/separator'
import { Profile, Verification } from '@/components/admin/user'
import { AddressesTable } from '@/components/admin/user/addresses'

const User = ({ params }) => {
  const { id } = params

  return (
    <div>
      <h1 className={'text-2xl font-bold'}>User</h1>
      <p className={'text-muted-foreground text-sm'}>{id}</p>
      <Separator className={'my-6'} />
      <div className={'flex flex-1 gap-4'}>
        <Profile id={id} />
        <Verification id={id} />
      </div>
      <div className={'my-6'}>
        <AddressesTable id={id} />
      </div>
    </div>
  )
}

export default User
