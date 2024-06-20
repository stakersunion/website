import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useVerification = () => {
  return useQuery({
    queryKey: ['user', 'verification'],
    queryFn: async () => {
      try {
        return await api.get('/user/verification')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useUpdateVerification = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/user/verification', {
          signature: data?.signature,
          schedule: data?.schedule,
          photo: data?.photo,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'verification'] })
    },
  })
}

export { useVerification, useUpdateVerification }
