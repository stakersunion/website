const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/users',
        permanent: true,
      },
      {
        source: '/account',
        destination: '/account/profile',
        permanent: true,
      },
      {
        source: '/apply',
        destination: '/apply/profile',
        permanent: true,
      },
    ]
  },
  experimental: {
    outputFileTracingIncludes: {
      '/api': ['./src/data/Solo-Stakers-A.csv', './src/data/Rocketpool-Solo-Stakers.csv'],
    },
  },
}

export default nextConfig
