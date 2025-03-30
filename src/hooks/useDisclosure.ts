'use client'

import { useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const toogle = () => {
    setIsOpen((prev) => !prev)
  }

  return [isOpen, { open, close, toogle }] as const
}
