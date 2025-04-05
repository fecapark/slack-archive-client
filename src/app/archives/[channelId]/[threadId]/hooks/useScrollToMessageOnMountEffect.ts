'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useScrollToMessageOnMountEffect = () => {
  const searchParams = useSearchParams()
  const messageId = searchParams.get('m') ?? undefined
  const threadId = searchParams.get('t') ?? undefined

  useEffect(() => {
    const getTargetElement = (type: 'message' | 'thread') => {
      const id = type === 'message' ? messageId : threadId
      return (document.querySelector(`[data-${type}-id="${id}"]`) ?? undefined) as
        | HTMLElement
        | undefined
    }

    const scroll = (targetElement: HTMLElement) => {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const highlight = (targetElement: HTMLElement) => {
      targetElement.style.backgroundColor = '#ffcc0033'

      const timeout = setTimeout(() => {
        targetElement.style.backgroundColor = ''
      }, 2000)

      return () => {
        clearTimeout(timeout)
      }
    }

    const process = (id: string | undefined, type: 'message' | 'thread') => {
      if (!id) {
        return undefined
      }

      const targetElement = getTargetElement(type)

      if (targetElement) {
        scroll(targetElement)
        const cleanup = highlight(targetElement)

        return () => {
          cleanup()
        }
      }
    }

    const cleanups = [process(threadId, 'thread'), process(messageId, 'message')]

    return () => {
      cleanups.forEach((cleanup) => cleanup?.())
    }
  }, [messageId, threadId])
}
