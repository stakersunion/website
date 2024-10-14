import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useSubmitScore = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ address }) => {
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
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'addresses'] })
    },
  })
}

const useScore = ({ address, enabled }) => {
  return useQuery({
    queryKey: ['user', 'addresses', address, 'score'],
    queryFn: async () => {
      try {
        const response = await api.get(`/user/passport?address=${address}`)
        return response.data
      } catch (error) {
        if (error.response && error.response.data) {
          throw new Error(error.response.data.error || error.message)
        } else {
          throw new Error(error.message || 'An unexpected error occurred')
        }
      }
    },
    enabled,
  })
}

export { useSubmitScore, useScore }
