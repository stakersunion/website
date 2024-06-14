'use server'

import { checkRole } from '@/utils/roles'
import { clerkClient } from '@clerk/nextjs/server'

const setRole = async ({ id, role }) => {
  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    return { message: 'Not Authorized' }
  }

  try {
    const res = await clerkClient.users.updateUser(id, {
      publicMetadata: { role },
    })
    return { message: res.publicMetadata }
  } catch (err) {
    return { message: err }
  }
}

export { setRole }
