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
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
    unoptimized: true, // 사용량 한계로 임시로 해둬요.
  },
}

export default nextConfig
