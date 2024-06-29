import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { SearchUsers } from '@/app/admin/_search-users'
import { setRole } from '@/app/admin/_actions'
import { clerkClient } from '@clerk/nextjs/server'
import { routes } from '@/utiles/routes'

const Manage = async (params) => {
  if (!checkRole('admin')) {
    redirect(routes.dashboard.path)
  }

  const query = params.searchParams.search

  const users = query ? (await clerkClient.users.getUserList({ query })).data : []

  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the 'admin' role.</p>

      <SearchUsers />

      {users.map((user) => {
        return (
          <div key={user.id}>
            <div>Current Role: {user.publicMetadata.role}</div>
            <div>
              <form action={setRole}>
                <input
                  type='hidden'
                  value={user.id}
                  name='id'
                />
                <input
                  type='hidden'
                  value='admin'
                  name='role'
                />
                <button type='submit'>Make Admin</button>
              </form>
            </div>
            <div>
              <form action={setRole}>
                <input
                  type='hidden'
                  value={user.id}
                  name='id'
                />
                <input
                  type='hidden'
                  value='member'
                  name='role'
                />
                <button type='submit'>Make Member</button>
              </form>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Manage
