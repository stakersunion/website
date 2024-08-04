import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      try {
        return await api.get('/admin/news')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useNewsItem = ({ id }) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      try {
        return await api.get('/admin/news', { params: { id } })
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useCreateNews = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.post('/admin/news', data)
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
  })
}

const useDeleteNews = ({ id }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      try {
        return await api.delete('/admin/news', { params: { id } })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
  })
}

const useEditNews = ({ id }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/admin/news', {
          id,
          ...data,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
  })
}

export { useNews, useNewsItem, useCreateNews, useDeleteNews, useEditNews }
