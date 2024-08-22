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

const useUpdateSplits = ({ splitsClient }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['admin-splits-update'],
    mutationFn: async (recipients) => {
      try {
        return await splitsClient.updateSplit({
          splitAddress: process.env.NEXT_PUBLIC_SPLIT_ADDRESS,
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
