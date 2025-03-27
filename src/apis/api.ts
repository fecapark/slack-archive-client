import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  retry: {
    limit: 3,
    statusCodes: [403, 408, 413, 429, 500, 502, 503, 504],
    methods: ['get', 'post', 'put'],
  },
})
