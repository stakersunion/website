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
  const queryClient = useQueryClient()
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
      // Access the user profile from the query cache
      const userProfile = queryClient.getQueryData(['user', 'profile'])

      // Check if userProfile contains name and email
      if (userProfile && userProfile.data && userProfile.data.name && userProfile.data.email) {
        return { current: 'eligibility', status: 'incomplete' }
      }

      if (!data.verification || Object.keys(data.verification).length === 0) {
        // Default output if verification is undefined or empty
        return { current: 'profile', status: 'incomplete' }
      }

      const { verification } = data
      const stepsOrder = ['eligibility', 'independent', 'residential']
      let lastRelevantStep = null
      let allApproved = true

      stepsOrder.forEach((step) => {
        if (verification[step]) {
          const status = verification[step].status
          // Check if step is pending or if no pending steps have been found yet
          if (status === 'pending' || !lastRelevantStep) {
            lastRelevantStep = { current: step, status: status || 'incomplete' }
          }
          // Determine if all steps are approved
          if (status !== 'approved') {
            allApproved = false
          }
        } else {
          // If the step data is missing, consider it incomplete
          lastRelevantStep = { current: step, status: 'incomplete' }
          allApproved = false
        }
      })

      // If all steps are approved, return the last step with 'approved' status
      if (allApproved) {
        return { current: stepsOrder[stepsOrder.length - 1], status: 'approved' }
      }

      return lastRelevantStep
    },
  })
}

export { useVerification, useUpdateVerification, useVerificationStatus }
