import { createContext } from 'react'

export type ToastItem = {
  id: string
  text: string
}

interface ToastContextProps {
  addToast: (text: string) => void
  toasts: ToastItem[]
}

export const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
})
