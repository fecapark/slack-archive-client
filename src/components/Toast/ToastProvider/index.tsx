'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { ToastContext, ToastItem } from '@/components/Toast/ToastProvider/context'

interface ToastProviderProps {
  duration: number
}

const ToastAnimationGroup = dynamic(
  () =>
    import('@/components/Toast/ToastProvider/ToastAnimationGroup').then(
      (m) => m.ToastAnimationGroup
    ),
  {
    ssr: false,
  }
)

export const ToastProvider = ({
  duration,
  children,
}: React.PropsWithChildren<ToastProviderProps>) => {
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    const current = timeouts.current
    return () => {
      current.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  const addToast = (text: string) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, text }])

    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, duration)

    timeouts.current.push(timeout)
  }

  return (
    <ToastContext.Provider value={{ addToast, toasts }}>
      {children}
      <ToastAnimationGroup />
    </ToastContext.Provider>
  )
}
