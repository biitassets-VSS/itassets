/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixed: Move from experimental.serverComponentsExternalPackages to top-level
  serverExternalPackages: ['@supabase/supabase-js'],
  
  // Keep your existing settings
  output: 'standalone',
  trailingSlash: false,
  
  // Fix Supabase Edge Runtime issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        buffer: false,
        util: false,
      };
    }
    return config;
  },
  
  // Remove invalid telemetry config
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = nextConfig
