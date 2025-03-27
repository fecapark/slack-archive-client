'use client'

import { usePathname } from 'next/navigation'

export const BaseBackgroundColorProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const pathname = usePathname()

  const backgroundColor = (() => {
    if (pathname.startsWith('/archives')) {
      return '#f6f7f9'
    }
    return '#ffffff'
  })()

  return (
    <div className="size-full" style={{ backgroundColor }}>
      {children}
    </div>
  )
}
