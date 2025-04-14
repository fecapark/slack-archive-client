import { OptionalPropsWhenEmptyObject, Prettify } from '@/types/misc'
import { dehydrate, isServer, QueryClient } from '@tanstack/react-query'

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

export const withDehydratedState = <TReturn, TProps extends { queryClient: QueryClient }>(
  fn: (v: TProps) => Promise<TReturn>
) => {
  type TPropsWithoutQueryClient = Prettify<Omit<TProps, 'queryClient'>>

  const queryClient = getQueryClient()

  return async (...p: OptionalPropsWhenEmptyObject<TPropsWithoutQueryClient>) => {
    const props = p[0] ?? {}
    const result = await fn({ ...props, queryClient } as TProps)
    return {
      ...result,
      dehydratedState: dehydrate(queryClient),
    }
  }
}
