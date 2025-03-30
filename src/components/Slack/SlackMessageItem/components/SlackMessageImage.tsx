'use client'

import clsx from 'clsx'

import AutoHeightImage from '@/components/AutoHeightImage'
import { SlackMessageImageDialog } from '@/components/Slack/SlackMessageItem/components/SlackMessageImageDialog'
import { useDisclosure } from '@/hooks/useDisclosure'
import { useImageFadeLoading } from '@/hooks/useImageFadeLoading'

interface SlackMessageImageProps {
  height: number | undefined
  src: string
  width: number | undefined
}

export const SlackMessageImage = ({ src, width, height }: SlackMessageImageProps) => {
  const { fadeStyle, onError, onLoad } = useImageFadeLoading()
  const [dialogOpened, { open, close }] = useDisclosure()

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    open()
  }

  return (
    <>
      <div
        className={clsx(
          'mb-2 inline-block w-full max-w-[360px] cursor-pointer overflow-hidden rounded-lg border border-[rgba(29,28,29,0.13)] bg-white'
        )}
      >
        <AutoHeightImage
          alt="이미지"
          className={fadeStyle}
          loading="eager"
          onClick={onClick}
          onError={onError}
          onLoad={onLoad}
          src={src}
        />
      </div>

      <SlackMessageImageDialog
        height={height}
        onOpenChange={(v) => !v && close()}
        open={dialogOpened}
        src={src}
        width={width}
      />
    </>
  )
}
