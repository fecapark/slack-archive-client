'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { OrbitProgress } from 'react-loading-indicators'

import { Dialog, DialogProps } from '@/components/Dialog'
import { useImageLoadingState } from '@/hooks/useImageLoadingState'

type SlackMessageImageDialogProps = DialogProps & {
  height: number | undefined
  src: string
  width: number | undefined
}

export const SlackMessageImageDialog = ({
  open,
  onOpenChange,
  src,
  width,
  height,
}: SlackMessageImageDialogProps) => {
  const { loadingState, onLoad, onError } = useImageLoadingState()

  const aspectRatio = width && height ? width / height : 1
  const padding = 20

  return (
    <Dialog
      className="!size-fit !max-h-none !max-w-none !bg-transparent"
      onOpenChange={onOpenChange}
      open={open}
    >
      <div
        className="relative"
        style={{
          width: `calc(min(100vw, calc(100vh * ${aspectRatio})) - ${padding * 2}px)`,
          height: `calc(min(100vh, calc(100vw * ${1 / aspectRatio})) - ${padding * 2}px)`,
          aspectRatio: `${width ?? 1}/${height ?? 1}`,
        }}
      >
        {loadingState === '로딩중' && (
          <div className="absolute top-1/2 left-1/2 -translate-1/2">
            <OrbitProgress color="white" dense size="small" />
          </div>
        )}
        <Image
          alt="이미지"
          className={clsx('rounded-2xl', loadingState === '로딩중' && 'opacity-0')}
          fill
          onError={onError}
          onLoad={onLoad}
          quality={100}
          sizes={`calc(min(100vw, calc(100vh * ${aspectRatio})) - ${padding * 2}px)`}
          src={src}
        />
      </div>
    </Dialog>
  )
}
