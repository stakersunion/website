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
      queryClient.invalidateQueries({ queryKey: ['user', 'verification'] })
    },
  })
}

export { useSubmitScore }
