import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useUpdateAppeal = ({ id }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/admin/user/appeal', {
          id,
          status: data.status,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export { useUpdateAppeal }
