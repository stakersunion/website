import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const usePassportAddress = () => {
  return useQuery({
    queryKey: ['user', 'passport'],
    queryFn: async () => {
      try {
        const response = await api.get('/user/passport')
        return response.data
      } catch (error) {
        if (error.response && error.response.data) {
          throw new Error(error.response.data.error || error.message)
        } else {
          throw new Error(error.message || 'An unexpected error occurred')
        }
      }
    },
  })
}

const useSetPassportAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (address) => {
      try {
        const response = await api.post('/user/passport', { address })
        return response.data
      } catch (error) {
        if (error.response && error.response.data) {
          throw new Error(error.response.data.error || error.message)
        } else {
          throw new Error(error.message || 'An unexpected error occurred')
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'passport'] })
    },
  })
}

export { usePassportAddress, useSetPassportAddress }
