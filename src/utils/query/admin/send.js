import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useSend = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.get('/admin/send', {
          params: { limit: data.limit },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('queue')
    },
  })
}

export { useSend }
