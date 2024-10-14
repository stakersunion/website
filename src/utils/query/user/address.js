import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useAddresses = () => {
  return useQuery({
    queryKey: ['user', 'addresses'],
    queryFn: async () => {
      try {
        const response = await api.get('/user/addresses')
        return response.data
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          throw new Error(error.response.data.error)
        } else {
          throw new Error(error.message || 'An unexpected error occurred')
        }
      }
    },
  })
}

const useAddAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.post('/user/addresses/add', {
          signature: data?.signature,
          type: data?.type,
        })
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          throw new Error(error.response.data.error)
        } else {
          throw new Error(error.message || 'An unexpected error occurred')
        }
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export { useAddresses, useAddAddress }
