import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useScorer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await api.post('/user/passport/scorer', {
          address: data.address,
        })
        const score = await api.get(`/user/passport/scorer?address=${data.address}`)
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

export { useScorer }
