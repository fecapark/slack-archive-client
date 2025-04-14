'use client'

import { useState } from 'react'

import { useRefEffect } from '@toss/react'

export const useHover = <T extends HTMLElement = HTMLElement>() => {
  const [value, setValue] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setValue(true)
  }
  const handleMouseLeave = () => {
    setValue(false)
  }

  const ref = useRefEffect<T>((target) => {
    target.addEventListener('mouseenter', handleMouseEnter)
    target.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      target.removeEventListener('mouseenter', handleMouseEnter)
      target.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return [ref, value] as const
}
