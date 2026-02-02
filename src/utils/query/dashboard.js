import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'

const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        return await api.get('/dashboard')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  })
}

export { useDashboard }
