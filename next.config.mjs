const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/users',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
