import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      try {
        return await api.get('/user/profile')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        const payload = {}
        const setIfProvided = (key) => {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            payload[key] = data[key]
          }
        }

        setIfProvided('name')
        setIfProvided('email')
        setIfProvided('discord')
        setIfProvided('withdrawalAddress')
        setIfProvided('clients')
        setIfProvided('region')
        setIfProvided('availability')
        setIfProvided('languages')
        setIfProvided('preferredContact')
        setIfProvided('stack')

        return await api.put('/user/profile', payload)
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })
}

export { useProfile, useUpdateProfile }
