'use client'

import { tv } from 'tailwind-variants'

import { useImageLoadingState } from '@/hooks/useImageLoadingState'

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
  const { loadingState, onError, onLoad } = useImageLoadingState()

  const fadeStyle = fade({ fade: loadingState })

  return { loadingState, fadeStyle, onLoad, onError }
}
