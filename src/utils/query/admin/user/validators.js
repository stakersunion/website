import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import api from '@/utils/api'

const useValidators = ({ id, address }) => {
  return useQuery({
    queryKey: ['user', id, 'address', address, 'validators'],
    queryFn: async () => {
      try {
        return await api.get('/admin/user/validators', {
          params: { id, address },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useLoadValidators = ({ id, address }) => {
  return useQuery({
    queryKey: ['user', id, 'address', address, 'load-validators'],
    queryFn: async () => {
      try {
        return await axios.get(`https://beaconcha.in/api/v1/validator/eth1/${address}`)
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data.data,
    enabled: false,
  })
}

const useSaveValidators = ({ id, address }) => {
  const queryClient = useQueryClient()
  return useMutation({
    queryKey: ['user', id, 'address', address, 'validators'],
    mutationFn: async (data) => {
      try {
        return await api.post('/admin/user/validators', {
          id,
          address,
          validators: data,
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
      queryClient.invalidateQueries(['user', id, 'address', address, 'validators'])
    },
  })
}

export { useValidators, useLoadValidators, useSaveValidators }
