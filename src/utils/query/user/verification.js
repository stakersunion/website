import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

const useVerification = () => {
  return useQuery({
    queryKey: ['user', 'verification'],
    queryFn: async () => {
      try {
        return await api.get('/user/verification')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data,
  })
}

const useUpdateVerification = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.put('/user/verification', {
          signature: data?.signature,
          schedule: data?.schedule,
          photo: data?.photo,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

const useVerificationStatus = () => {
  return useQuery({
    queryKey: ['user', 'verification', 'status'],
    queryFn: async () => {
      try {
        return await api.get('/user')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => {
      const { profile, verification } = data

      // Default output if verification is undefined or empty
      if (!verification || Object.keys(verification).length === 0) {
        // Check if profile has been defined in the cache
        if (profile.name && profile.email) {
          return { current: 'eligibility', status: 'incomplete' }
        }
        // If it has not, return 'profile' with status 'incomplete'
        else {
          return { current: 'profile', status: 'incomplete' }
        }
      }

      const steps = ['eligibility', 'independent', 'residential']

      // Get the last step that has a status
      const lastDefinedStep = steps
        .slice()
        .reverse()
        .find((step) => verification[step]?.status)

      // If the last defined step has a status of 'approved', return
      // the next step in the sequence (if defined) with a status of
      // 'incomplete'
      if (verification[lastDefinedStep]?.status === 'approved') {
        const nextStep = steps[steps.indexOf(lastDefinedStep) + 1]
        if (nextStep) {
          return { current: nextStep, status: 'incomplete' }
        }
      }

      // Otherwise, return the last defined step with its status
      return {
        current: lastDefinedStep,
        status: verification[lastDefinedStep]?.status,
      }
    },
  })
}

export { useVerification, useUpdateVerification, useVerificationStatus }
