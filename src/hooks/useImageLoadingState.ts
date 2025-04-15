'use client'

import { useState } from 'react'

export const useImageLoadingState = () => {
  const [loadingState, setLoadingState] = useState<'로딩완료' | '로딩중' | '에러'>('로딩중')

  const onLoad = () => {
    setLoadingState('로딩완료')
  }

  const onError = () => {
    setLoadingState('에러')
  }

  return { loadingState, onLoad, onError }
}
