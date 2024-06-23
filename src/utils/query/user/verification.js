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
      let { verification } = data
      let steps = ['eligibility', 'independent', 'residential']
      let lastCompletedStep = null

      if (!verification) {
        return {
          current: 'eligibility',
          status: 'incomplete',
        }
      }

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        if (verification[step]) {
          if (verification[step].status === 'approved') {
            lastCompletedStep = step
          } else {
            return { current: step, status: verification[step].status }
          }
        }
      }

      if (lastCompletedStep) {
        const nextStepIndex = steps.indexOf(lastCompletedStep) + 1
        if (nextStepIndex < steps.length) {
          return { current: steps[nextStepIndex], status: 'incomplete' }
        } else {
          return { current: lastCompletedStep, status: verification[lastCompletedStep].status }
        }
      }

      return { current: steps[0], status: 'incomplete' }
    },
  })
}

export { useVerification, useUpdateVerification, useVerificationStatus }
