import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ca.slack-edge.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.slack-edge.com',
      },
      {
        protocol: 'https',
        hostname: 'emoji.slack-edge.com',
      },
      {
        protocol: 'https',
        hostname: 'a.slack-edge.com',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_API_URL.replace('https://', ''),
      },
    ],
  },
}

export default nextConfig
