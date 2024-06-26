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
      queryClient.invalidateQueries({ queryKey: ['user', 'verification'] })
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
      const { verification } = data
      const stepsOrder = ['eligibility', 'independent', 'residential']
      let lastRelevantStep = null

      stepsOrder.forEach((step) => {
        if (verification[step]) {
          const status = verification[step].status
          // Consider the step as relevant if it is pending or not approved
          if (status === 'pending' || status !== 'approved') {
            lastRelevantStep = { current: step, status: status || 'incomplete' }
          } else if (status === 'approved') {
            // Keep updating last relevant step as we go if all are approved
            lastRelevantStep = { current: step, status: 'approved' }
          }
        } else {
          // If the step data is missing, consider it incomplete
          lastRelevantStep = { current: step, status: 'incomplete' }
        }
      })

      // Return the last relevant step found
      return lastRelevantStep
    },
  })
}

export { useVerification, useUpdateVerification, useVerificationStatus }
