import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useValidator = ({ id, address, publicKey }) => {
  return useQuery({
    queryKey: ['user', id, 'address', address, 'validator', publicKey],
    queryFn: async () => {
      try {
        return await api.get('/admin/user/validator', {
          params: { id, address, publicKey },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useCreateValidator = ({ id, address }) => {
  const queryClient = useQueryClient()
  return useMutation({
    queryKey: ['user', id, 'address', address, 'validator'],
    mutationFn: async (data) => {
      try {
        return await api.post('/admin/user/validator', {
          id,
          address,
          validator: data,
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
      queryClient.invalidateQueries(['user', id, 'address', address, 'validator'])
    },
  })
}

const useRemoveValidator = ({ id, address, publicKey }) => {
  const queryClient = useQueryClient()
  return useMutation({
    queryKey: ['user', id, 'address', address, 'validator', publicKey],
    mutationFn: async () => {
      try {
        return await api.delete('/admin/user/validator', {
          params: { id, address, publicKey },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user', id, 'address', address, 'validator'])
    },
  })
}

export { useValidator, useCreateValidator, useRemoveValidator }
