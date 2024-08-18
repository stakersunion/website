import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useAddress = ({ id, address }) => {
  return useQuery({
    queryKey: ['user', id, 'address', address],
    queryFn: async () => {
      try {
        return await api.get('/admin/user/address', { params: { id, address } })
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useUpdateAddress = ({ id, address }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/admin/user/address', {
          id,
          address,
          newAddress: data.address,
          newType: data.type,
        })
      } catch (error) {
        if (error?.response?.data?.error) {
          throw new Error(error.response.data.error)
        } else {
          throw new Error(error)
        }
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['user', id, 'address', address])
    },
  })
}

const useCreateAddress = ({ id }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.post('/admin/user/address', {
          id,
          ...data,
        })
      } catch (error) {
        if (error?.response?.data?.error) {
          throw new Error(error.response.data.error)
        } else {
          throw new Error(error)
        }
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['user', id, 'address'])
    },
  })
}

const useRemoveAddress = ({ id, address }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      try {
        return await api.delete('/admin/user/address', { params: { id, address } })
      } catch (error) {
        if (error?.response?.data?.error) {
          throw new Error(error.response.data.error)
        } else {
          throw new Error(error)
        }
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['user', id, 'address'])
    },
  })
}

export { useAddress, useUpdateAddress, useCreateAddress, useRemoveAddress }
