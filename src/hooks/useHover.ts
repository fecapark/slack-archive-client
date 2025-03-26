'use client'

import { useEffect, useRef, useState } from 'react'

export const useHover = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<null | T>(null)
  const [value, setValue] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setValue(true)
  }
  const handleMouseLeave = () => {
    setValue(false)
  }

  useEffect(() => {
    const target = ref.current
    if (!target) {
      return
    }

    target.addEventListener('mouseenter', handleMouseEnter)
    target.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      target.removeEventListener('mouseenter', handleMouseEnter)
      target.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])

  return [ref, value] as const
}
