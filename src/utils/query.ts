import { isServer, QueryClient } from '@tanstack/react-query'

let browserQueryClient: QueryClient | undefined = undefined

export const getQueryClient = () => {
  const makeQueryClient = () => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          throwOnError: true,
          staleTime: 60 * 1000,
        },
        mutations: {
          throwOnError: true,
        },
      },
    })
  }

  if (isServer) {
    return makeQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}
