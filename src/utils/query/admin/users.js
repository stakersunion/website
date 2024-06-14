import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        return await api.get('/admin/users')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data: { data } }) => {
      return data.map((item) => ({
        id: item.id,
        address: item.web3Wallets[0].web3Wallet,
        createdAt: item.createdAt,
        role: item.publicMetadata.role,
      }))
    },
  })
}

const useUpdateRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.patch('/admin/users', {
          id: data.id,
          role: data.role,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export { useUsers, useUpdateRole }
