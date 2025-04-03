import { BaseBackgroundColorProvider } from '@/components/Providers/BaseBackgroundColorProvider'
import { TanstackQueryProvider } from '@/components/Providers/TanstackQueryProvider'
import { ToastProvider } from '@/components/Providers/ToastProvider'

export const Providers = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <BaseBackgroundColorProvider>
      <ToastProvider duration={3000}>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </ToastProvider>
    </BaseBackgroundColorProvider>
  )
}
