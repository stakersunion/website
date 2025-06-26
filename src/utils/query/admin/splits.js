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

const useUpdateSplits = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['admin-splits-update'],
    mutationFn: async ({ client, splitAddress, recipients }) => {
      try {
        return await client.updateSplit({
          splitAddress: splitAddress,
          recipients,
          distributorFeePercent: 0,
          totalAllocationPercent: 100.0,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('admin-splits-metadata')
    },
  })
}

export { useSplitsMetadata, useUpdateSplits }
