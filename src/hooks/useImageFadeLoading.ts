'use client'

import { useState } from 'react'
import { tv } from 'tailwind-variants'

export type ImageFadeLoadingState = '로딩완료' | '로딩중' | '에러'

const fade = tv({
  base: 'ease-ease transition-opacity duration-300',
  variants: {
    fade: {
      로딩완료: 'opacity-100',
      로딩중: 'opacity-0',
      에러: 'opacity-0',
    },
  },
})

export const useImageFadeLoading = () => {
  const [loadingState, setLoadingState] = useState<ImageFadeLoadingState>('로딩중')

  const fadeStyle = fade({ fade: loadingState })

  const onLoad = () => {
    setLoadingState('로딩완료')
  }

  const onError = () => {
    setLoadingState('에러')
  }

  return { loadingState, fadeStyle, onLoad, onError }
}
