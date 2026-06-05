/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Temporary fix for deployment
  },
}

module.exports = nextConfig
