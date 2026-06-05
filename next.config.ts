/** @type {import('next').NextConfig} */
const nextConfig = {
  // Move serverComponentsExternalPackages from experimental to top level
  serverExternalPackages: ['@supabase/supabase-js'],
  
  // Ensure proper static generation
  output: 'standalone',
  trailingSlash: false,
  
  // Optional: Add webpack config to handle Node.js APIs in edge runtime
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Optional: Disable telemetry to avoid the warning
  experimental: {
    telemetry: false,
  },
}

module.exports = nextConfig
