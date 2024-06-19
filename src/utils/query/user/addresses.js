import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useSubmitAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/user/addresses', {
          address: data.address,
          type: data.type,
          signature: data.signature,
          schedule: data.schedule,
        })
      } catch (error) {
        let message = error?.response?.data?.error
        throw new Error(message || error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

const useUpdateSchedule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/user/addresses', {
          schedule: data.schedule,
        })
      } catch (error) {
        let message = error?.response?.data?.error
        throw new Error(message || error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export { useSubmitAddress, useUpdateSchedule }
