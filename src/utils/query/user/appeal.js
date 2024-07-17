import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useAppeal = () => {
  return useQuery({
    queryKey: ['user', 'appeal'],
    queryFn: async () => {
      try {
        return await api.get('/user/appeal')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: (data) => data.data,
    retry: false,
  })
}

const useUpdateAppeal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/user/appeal', {
          address: data.address,
          type: data.type,
          method: data.method,
          rationale: data.rationale,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'appeal'] })
    },
  })
}

export { useAppeal, useUpdateAppeal }
