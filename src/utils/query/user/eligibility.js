import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useCheckEligibility = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/user/eligibility', {
          signature: data?.signature,
        })
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          throw new Error(error.response.data.error)
        } else {
          throw new Error(error.message || 'An unexpected error occurred')
        }
      }
    },
    onSettled: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export { useCheckEligibility }
