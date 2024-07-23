import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useUpdateStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/user/verification/status', {
          eligibility: data?.eligibility,
          independent: data?.independent,
          residential: data?.residential,
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

export { useUpdateStatus }
