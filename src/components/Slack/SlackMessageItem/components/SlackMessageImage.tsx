'use client'

import AutoHeightImage from '@/components/AutoHeightImage'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
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
      <div className="mb-2 w-full max-w-[360px] cursor-pointer">
        <ImagePlaceholder height={height ?? 0} width={width ?? 0}>
          <AutoHeightImage
            alt="이미지"
            className={fadeStyle}
            onClick={onClick}
            onError={onError}
            onLoad={onLoad}
            sizes="360px"
            src={src}
          />
        </ImagePlaceholder>
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
