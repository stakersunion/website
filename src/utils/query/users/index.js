import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'

const useUserCount = () => {
  return useQuery({
    queryKey: ['user', 'count'],
    queryFn: async () => {
      try {
        return await api.get('/users/count')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        return await api.get('/users')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

export { useUserCount, useUsers }
