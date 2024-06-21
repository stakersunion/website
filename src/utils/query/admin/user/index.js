import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useUser = ({ id }) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      try {
        return await api.get('/admin/user', { params: { id } })
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useUpdateUser = ({ id }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/admin/user', {
          id,
          name: data.name,
          email: data.email,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user', id] })
    },
  })
}

export { useUser, useUpdateUser }
