import { TanstackQueryProvider } from '@/components/Providers/TanstackQueryProvider'

export const Providers = ({ children }: React.PropsWithChildren<unknown>) => {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>
}
