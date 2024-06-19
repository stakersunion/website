import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'

const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        return await api.get('/user')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

export { useUser }
