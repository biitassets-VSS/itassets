/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  // Ensure proper static generation
  output: 'standalone',
  trailingSlash: false,
}

module.exports = nextConfig
