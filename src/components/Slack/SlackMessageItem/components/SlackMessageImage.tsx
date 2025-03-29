'use client'

import AutoHeightImage from '@/components/AutoHeightImage'
import { useImageFadeLoading } from '@/hooks/useImageFadeLoading'

interface SlackMessageImageProps {
  src: string
}

export const SlackMessageImage = ({ src }: SlackMessageImageProps) => {
  const { fadeStyle, onError, onLoad } = useImageFadeLoading()
  return (
    <div className="mb-2 inline-block w-full max-w-[360px] overflow-hidden rounded-lg border border-[rgba(29,28,29,0.13)] bg-white">
      <AutoHeightImage
        alt="이미지"
        className={fadeStyle}
        loading="eager"
        onError={onError}
        onLoad={onLoad}
        src={src}
      />
    </div>
  )
}
