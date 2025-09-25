/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('heic2any')
    }
    return config
  },
}

export default nextConfig
