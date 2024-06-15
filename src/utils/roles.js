import { useClerk } from '@clerk/nextjs'

const useRole = () => {
  const { user } = useClerk()
  if (!user) return null
  return user.publicMetadata.role
}

export default useRole
