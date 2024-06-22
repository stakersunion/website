import { useMutation } from '@tanstack/react-query'
import api from '@/utils/api'

const useNotify = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        return await api.post('/send', {
          name: data.name,
          title: data.title,
          content: data.content,
          buttonText: data.buttonText,
          href: data.href,
          email: data.email,
          subject: data.subject,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
  })
}

export { useNotify }
