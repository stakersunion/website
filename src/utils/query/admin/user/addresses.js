import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useAddresses = ({ id }) => {
  return useQuery({
    queryKey: ['user', 'addresses', id],
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

const useCreateAddress = ({ id }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.post('/admin/user/addresses', {
          id,
          ...data,
        })
      } catch (error) {
        if (error?.response?.data?.error) {
          throw new Error(error.response.data.error)
        } else {
          throw new Error(error)
        }
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['user', 'addresses', id])
    },
  })
}

export { useAddresses, useCreateAddress }
