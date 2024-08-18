import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'

const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      try {
        return await api.get('/news')
      } catch (error) {
        throw new Error(error)
      }
    },
    select: ({ data }) => data.filter((news) => !news.archived),
  })
}

export { useNews }
