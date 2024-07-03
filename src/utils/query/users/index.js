import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'

const useUserCount = () => {
  return useQuery({
    queryKey: ['user', 'count'],
    queryFn: async () => {
      try {
        return await api.get('/users')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

export { useUserCount }
