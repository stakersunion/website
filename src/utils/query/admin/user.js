import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useUser = ({ id }) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      try {
        return await api.get('/admin/user', { params: { id } })
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

export { useUser }
