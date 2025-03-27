import { BaseBackgroundColorProvider } from '@/components/Providers/BaseBackgroundColorProvider'
import { TanstackQueryProvider } from '@/components/Providers/TanstackQueryProvider'

export const Providers = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <BaseBackgroundColorProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </BaseBackgroundColorProvider>
  )
}
