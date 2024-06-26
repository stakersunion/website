import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SITE_SCHEMA +
    (process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL) +
    '/api',
})

export default api
