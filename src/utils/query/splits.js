import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useSplitsMetadata = () => {
  return useQuery({
    queryKey: ['splits-metadata'],
    queryFn: async () => {
      try {
        return await api.get('/splits/metadata')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useSplitsBalance = () => {
  return useQuery({
    queryKey: ['splits-balance'],
    queryFn: async () => {
      try {
        return await api.get('/splits/balance')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

export { useSplitsMetadata, useSplitsBalance }
