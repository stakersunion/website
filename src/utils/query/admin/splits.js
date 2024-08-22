import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useSplitsMetadata = () => {
  return useQuery({
    queryKey: ['admin-splits-metadata'],
    queryFn: async () => {
      try {
        return await api.get('/admin/splits/metadata')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

export { useSplitsMetadata }
