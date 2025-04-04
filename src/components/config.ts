export const stage = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

export const config = {
  prod: {
    baseURL: process.env.NEXT_PUBLIC_PUBLIC_ORIGIN,
  },
  dev: {
    baseURL: 'http://localhost:3000',
  },
}[stage]
