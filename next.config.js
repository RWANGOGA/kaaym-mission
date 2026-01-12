/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Development - localhost
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8080',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
      // Production - Render backend
      {
        protocol: 'https',
        hostname: 'kaaym-backend.onrender.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;