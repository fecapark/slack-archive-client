'use client'

import { useContext } from 'react'

import { ToastContext } from '@/components/Toast/ToastProvider/context'

export const useToast = () => {
  const { addToast } = useContext(ToastContext)
  return {
    success: addToast,
  }
}
