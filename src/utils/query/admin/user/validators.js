import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import api from '@/utils/api'

const useLoadValidators = ({ id, address }) => {
  return useQuery({
    queryKey: ['user', 'validators', id, address],
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

export { useLoadValidators }
