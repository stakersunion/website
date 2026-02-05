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
      queryClient.invalidateQueries({ queryKey: ['user', 'addresses'] })
    },
  })
}

const useRemoveAddress = ({ address }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      try {
        return await api.delete('/user/addresses/remove', { params: { address } })
      } catch (error) {
        if (error?.response?.data?.error) {
          throw new Error(error.response.data.error)
        } else {
          throw new Error(error)
        }
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'addresses'] })
      queryClient.invalidateQueries({ queryKey: ['user', 'verification'] })
    },
  })
}

export { useAddresses, useAddAddress, useRemoveAddress }
