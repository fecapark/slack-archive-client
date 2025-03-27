'use client'

import { getQueryClient } from '@/utils/query'
import { QueryClientProvider } from '@tanstack/react-query'

export const TanstackQueryProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
