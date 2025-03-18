import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useQueue = () => {
  return useQuery({
    queryKey: ['queue'],
    queryFn: async () => {
      try {
        return await api.get('/admin/queue')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useCreateQueue = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.post('/admin/queue', data)
      } catch (error) {
        throw new Error(error)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('queue')
    },
  })
}

const useDeleteQueue = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.delete('/admin/queue', {
          params: { ids: data.ids },
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

export { useQueue, useCreateQueue, useDeleteQueue }
