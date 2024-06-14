import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { Title } from '@/components'
import { routes } from '@/utils/routes'
import { Users } from '@/components/admin'

const Admin = async () => {
  if (!checkRole('admin')) {
    redirect(routes.home.path)
  }

  return <Users />
}

export default Admin
