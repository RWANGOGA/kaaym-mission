
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // For Turbopack with Tailwind v4
  experimental: {
    turbo: {
      rules: {
        '*.css': {
          loaders: ['postcss'],
        }
      }
    }
  }
}
