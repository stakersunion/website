import { auth } from '@clerk/nextjs/server'

const checkRole = (role) => {
  const { sessionClaims } = auth()

  return sessionClaims?.metadata.role === role
}

export { checkRole }
