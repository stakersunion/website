import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useVerification = ({ id }) => {
  return useQuery({
    queryKey: ['user', id, 'verification'],
    queryFn: async () => {
      try {
        return await api.get('/admin/user/verification', { params: { id } })
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useUpdateVerification = ({ id }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/admin/user/verification', {
          id,
          eligibility: {
            status: data.eligibility.status,
          },
          independent: {
            status: data.independent.status,
          },
          residential: {
            status: data.residential.status,
          },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user', id, 'verification'] })
    },
  })
}

export { useVerification, useUpdateVerification }
