import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'

const useAddresses = ({ id }) => {
  return useQuery({
    queryKey: ['user', id, 'addresses'],
    queryFn: async () => {
      try {
        return await api.get('/admin/user/addresses', { params: { id } })
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

export { useAddresses }
